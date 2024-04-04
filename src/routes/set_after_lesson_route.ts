import { Request, Response } from "express";
import { RequestRoute } from "../handler/request_route";
import { MongoDBConnection } from "../service/cluster/mongo_db";
import { ResultSchema } from "../class/result_schema";

export default class SetAfterLessonRoute extends RequestRoute {

    constructor(req: Request, res: Response) {
        super(req, res);
        this.routeProcess()
    }

    private async routeProcess() : Promise<void> {
        const device_id = this.request.body['device-id']
        const results = this.request.body['results']
        if (!device_id || typeof device_id !== 'string' || !results || typeof results !== 'object') {
            this.response.send({
                status : false,
                error : 'Input Error',
                errorMessage : 'HTTP(s) isteklerinin girdisinde problem var.'
            })
            return;
        }

        var resultList = this.setResultList(results);
        if(!resultList.success) return;

        let { success, connection } = await this.connectDB();
        if (!success) return;
        connection = connection!

        var process_result = await this.setResultsToDB(connection, device_id, resultList.list)
        if (!process_result) {
            this.response.send({
                status : false,
                error : 'Database Error',
                errorMessage : 'Cevaplar veritabanına işlenirken bir problem oluştu.'
            })
        }
        this.response.send({
            status: true
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

    private async setResultsToDB(connection: MongoDBConnection, id: string, list : Array<ResultSchema>): Promise<boolean> { 
        var result = await connection.updateManyForResult(list, id)
        if (!result.success) {return false}
        return true
    }

    private setResultList(results : Array<any>) : {success : boolean, list : Array<ResultSchema>}{
        var process_status = true;
        var schemas : Array<ResultSchema> = results.map((question) => {
            if (!process_status) {
                return ResultSchema.createFreeSchema();
            }
            var model =  ResultSchema.createSchema(question);
            if (!model["schema-status"] || !model.schema) {
                process_status = false
                return ResultSchema.createFreeSchema();
            }
            return model.schema
        })

        if(!process_status){
            this.response.send({
                status : false,
                error : 'Input Error',
                errorMessage : 'HTTP(s) isteklerinin girdisinde problem var.'
            })
        }
        return {
            success : process_status,
            list : schemas
        }
    }
}
