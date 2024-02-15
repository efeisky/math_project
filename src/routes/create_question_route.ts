import { Request, Response } from "express";
import { RequestRoute } from "../handler/request_route";
import { MongoDBConnection } from "../service/cluster/mongo_db";
import { OpenAIConnection } from "../service/openai/open_ai";
import { QuestionRequestBodySchema } from "../class/question_schemas";

export default class CreateQuestionRoute extends RequestRoute {

    constructor(req: Request, res: Response) {
        super(req, res);
        this.routeProcess()
    }

    private async routeProcess() : Promise<void> {
        // let { success, connection } = await this.connectDB();
        // if (!success) return;
        // connection = connection!

        const requestBody = new QuestionRequestBodySchema()
        requestBody.fromJSON(this.request.body);
        this.connectAI(requestBody);
        
        // const deviceId = requestBody.getDeviceID()

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

    private async connectAI(schema : QuestionRequestBodySchema): Promise<{ success: boolean, connection: MongoDBConnection | null }>  {
        const subject = `Soru Konusu : ${schema.getContent()}, Soru Zorluk Seviyesi : ${schema.getLevel()}`
        console.log(subject)
        const openai = new OpenAIConnection(subject);
        //TODO: Burada son zamanlarda 5 dolarlık bir bütçe ile bu işlemi tamamlayacaksın
        return {
            success : true,
            connection : null
        };
    }
}
