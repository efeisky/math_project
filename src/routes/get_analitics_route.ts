import { Request, Response } from "express";
import { RequestRoute } from "../handler/request_route";
import { MongoDBConnection } from "../service/cluster/mongo_db";
import { QuestionSchema } from "../service/schema/question_schema";

export default class GetAnaliticsRoute extends RequestRoute {

    constructor(req: Request, res: Response) {
        super(req, res);
        this.routeProcess()
    }

    private async routeProcess() : Promise<void> {
        const device_id = this.request.body['device-id']
        if (!device_id || typeof device_id !== 'string') {
            this.response.send({
                status : false,
                error : 'Input Error',
                errorMessage : 'HTTP(s) isteklerinin girdisinde problem var.'
            })
            return;
        }
        
        let { success, connection } = await this.connectDB();
        if (!success) return;
        connection = connection!
        

        const questions = await this.getAnalytics(connection, device_id);
        if (!questions.success || questions.data == null) return;

        this.response.send({
            status: true,
            user_analytics : this.getModifiedQuestionsList(questions.data)
        })
    }

    private async connectDB(): Promise<{ success: boolean, connection: MongoDBConnection | null }> {
        const connection = new MongoDBConnection();
        let {success, error} = await connection.connect();
        if (!success) {
            this.response.send({
                status : false,
                error : 'Database Error',
                errorMessage : error
            })
            return {
                success : false,
                connection: null
            };
        }
        return {
            success : true,
            connection : connection
        };
    }

    private async getAnalytics(connection: MongoDBConnection, id: string): Promise<{ success: boolean, data : Array<QuestionSchema> | null }> {
        
        var connectionResult = await connection.find({
            device_id : id
        }, [], 'questions');
        
        if (typeof connectionResult === "boolean" || !Array.isArray(connectionResult)) {
            return {
                success: false,
                data : null
            };
        }

        var questionSchemaList: Array<QuestionSchema> = connectionResult.map((item: any) => {
            var questionSchema = new QuestionSchema();
            questionSchema.fromJSON(item);
            return questionSchema;
        });
        
        return {
            success: true,
            data : questionSchemaList
        };
    }

    private getModifiedQuestionsList(data: Array<QuestionSchema>) {
        var subjectList: { [subject: string]: { total: number, correct: number, percentage: number } } = {};
    
        data.forEach(question => {
            if (!subjectList[question.questionSubject]) {
                subjectList[question.questionSubject] = { total: 0, correct: 0, percentage: 0 };
            }
    
            subjectList[question.questionSubject].total++;
    
            if (question.trueAnswer === question.userChoice) {
                question.isDidTrue = true;
                subjectList[question.questionSubject].correct++;
            }
        });
    
        Object.keys(subjectList).forEach(subject => {
            var { total, correct } = subjectList[subject];
            subjectList[subject].percentage = (correct / total) * 100;
        });
        return {
            questions: data,
            subjects: subjectList
        };
    }
    
}
