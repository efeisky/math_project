import { Request, Response } from "express";
import { RequestRoute } from "../handler/request_route";
import { MongoDBConnection } from "../service/cluster/mongo_db";
import { randomUUID } from "crypto";
import { UserSchema } from "../service/schema/user_schema";

export default class SetDeviceIdRoute extends RequestRoute {

    constructor(req: Request, res: Response) {
        super(req, res);
        this.routeProcess()
    }

    private async routeProcess() : Promise<void> {
        let { success, connection } = await this.connectDB();
        if (!success) return;
        connection = connection!

        const {id : device_id} = await this.createId(connection)

        if (!(await this.saveDevice(connection, device_id))) return;

        this.response.send({
            status: true,
            created_id : device_id
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

    private async createId(connection : MongoDBConnection): Promise<{ id: string }> {
        
        const uuid = randomUUID()

        const idExists = await connection.find({
            device_id : uuid
        }, true)
        if (idExists) {
            this.createId(connection)
        }

        return {
            id : uuid
        }
    }

    private async saveDevice(connection : MongoDBConnection, id : string): Promise<{ success : boolean }> {
        
        const user = new UserSchema(id, [])
        const connectionResult = await connection.add(user.toJson());
        if (!connectionResult.success) {
            this.response.send({
                error : 'Database Error',
                errorMessage : connectionResult.error
            })

            return {
                success : false
            }
        }
        return {
            success : true
        }
    }
}
