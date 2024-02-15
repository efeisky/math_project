import { MongoClient } from 'mongodb';

export class MongoDBConnection {
    private uri: string = "mongodb+srv://efeisky:N9BIai14Pk0968fx@cluster0.dyzgeyl.mongodb.net/?retryWrites=true&w=majority";
    private client: MongoClient;

    private db_options = {
        name : 'project',
        collection : 'users'
    }

    constructor() {
        this.client = new MongoClient(this.uri);
    }

    async connect(): Promise<{ success: boolean, error: unknown | null }> {
        try {
            await this.client.connect();
            return { success: true, error: null };
        } catch (error) {
            return { success: false, error: error };
        }
    }
    
    async add(document: any): Promise<{ success: boolean, error: unknown | null }> {
        try {
            const db = this.client.db(this.db_options.name);
            const collection = db.collection(this.db_options.collection);

            await collection.insertOne(document);
            return { success: true, error: null };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async addMany(document: any[], id: string): Promise<{ success: boolean, error: unknown | null }> {
        try {
            const db = this.client.db(this.db_options.name);
            const collection = db.collection(this.db_options.collection);
    
            const userCollection = await collection.findOne({ device_id: id });
    
            if (!userCollection) {
                return { success: false, error: 'Kayıt Bulunamadı' };
            }
    
            const updatedQuestions = [...userCollection.questions, ...document];
            await collection.updateOne({ device_id: id }, { $set: { questions: updatedQuestions } });
    
            return { success: true, error: null };
        } catch (error) {
            return { success: false, error: error };
        }
    }
    
    async find(document: object, returnValue: Array<Object> | Boolean, returnObject : string = ''): Promise<Array<Object> | Boolean> {
        
        const db = this.client.db(this.db_options.name);
        const collection = db.collection(this.db_options.collection);

        const result = await collection.find(document).toArray();
        if (typeof returnValue === 'boolean') {
            return result.length > 0;
        } else {
            if (returnObject !== '') {
                return result.map(item => item[returnObject])[0];
            } else {
                return result;
            }
        }
    }

}

