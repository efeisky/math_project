import { Request, Response } from "express";
import { RequestRoute } from "../handler/request_route";
import { MongoDBConnection } from "../service/cluster/mongo_db";
import { OpenAIConnection } from "../service/openai/open_ai";
import { QuestionAISchema, QuestionRequestBodySchema } from "../class/question_schemas";
import { AISchema } from "../class/ai_schemas";
import { QuestionSchema } from "../service/schema/question_schema";

export default class CreateQuestionRoute extends RequestRoute {

    constructor(req: Request, res: Response) {
        super(req, res);
        this.routeProcess()
    }

    private async routeProcess() : Promise<void> {
        let { success, connection } = await this.connectDB();
        if (!success) return;
        connection = connection!
        let requestBody = new QuestionRequestBodySchema()
        requestBody.fromJSON(this.request.body);
        if (requestBody.getContent() == '' || requestBody.getLevel() == 0 || requestBody.getDeviceID() == '') {
            this.response.send({
                status : false,
                error : 'Input Error',
                errorMessage : 'HTTP(s) isteklerinin girdisinde problem var.'
            })
            return;
        }

        let AIModel = await this.connectAI(requestBody);
        if (!AIModel.success || !AIModel.model) {
            this.response.send({
                status : false,
                error : 'AI Error',
                errorMessage : 'Yapay zeka sisteminde bir problem var.'
            });
            return;
        };
        let model = this.redesignQuestionList(AIModel.model.questionsListGet)
        //let deviceId = requestBody.getDeviceID()

        //let db_result = await this.setQuestionsToDB(connection, deviceId, model.question_list);
        //if (!db_result.success) {
        //    this.response.send({
        //        status : false,
        //        error : 'DB Error',
        //        errorMessage : 'Sistemsel bir problem meydana geldi.'
        //    });
        //    return;
        //};
        this.response.send({
            status : true,
            questions : db_result.newList,
            ids : model.id_list
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

    private async connectAI(schema : QuestionRequestBodySchema): Promise<{ success: boolean, model : AISchema | null}>  {
        var subject = `Soru Konusu : ${schema.getContent()}, Soru Zorluk Seviyesi : ${schema.getLevel()}`
        const openai = new OpenAIConnection(subject);
        var created_model = await openai.create(schema.getContent())
        if (!created_model.status) {return {success : false, model : null}};
        return {
            success : true,
            model : created_model.model
        };
    }

    private async setQuestionsToDB(connection: MongoDBConnection, id: string, list : Array<QuestionSchema>): Promise<{ success: boolean, newList? : Array<any>, error?: any}> { 
        
        var json_list = list.map((question)=>{
            return question.toJSON()
        })
        
        var result = await connection.addMany(json_list, id)
        if (!result.success) {return{success: false, error: result.error}}
        return {
            success : true,
            newList : json_list
        }
    }

    private redesignQuestionList(questions : Array<QuestionAISchema>) : {question_list : Array<QuestionSchema>, id_list : Array<string>}{
        var id_list : Array<string> = [] 
        var question_list = questions.map((question) => {
            var model = new QuestionSchema().fromAISchema(question)
            id_list.push(model.id)
            return model.schema
        })
        return {
            question_list,
            id_list
        }
    }
}
