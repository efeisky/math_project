
class ResultSchema {
    private question_id : string;
    private question_choice : number;
    private question_result : boolean;

    constructor(data : any){
        this.question_id = data['question-id'];
        this.question_choice = data['user-choice'];
        this.question_result = data['result'];
    }

    /**
     * createSchema
     */
    public static createSchema(data : any) : {"schema-status" : boolean, "schema" : ResultSchema | null}{
        if (!data['question-id'] || data['question-id'] == '' || !data['user-choice'] || typeof(data['user-choice']) != "number" || !data['result']) {
            return {
                "schema-status" : false,
                schema : null
            }
        }
        return {
            "schema-status" : true,
            schema : new ResultSchema(data)
        }
    }
    
    /**
     * createFreeSchema
     */
    public static createFreeSchema() : ResultSchema{
        return new ResultSchema({
            "question-id" : "",
            "user-choice" : 0,
            "result" : false
        })
    }
    
    
    public get getID() : string {
        return this.question_id
    }
    
    public get getChoice() : number {
        return this.question_choice
    }

    public get getResult() : boolean {
        return this.question_result
    }
    
}



export  { ResultSchema };