import { QuestionSchema } from "./question_schema";

export class UserSchema {
    private device_id: string;
    private questions: Array<QuestionSchema>;

    constructor(device_id: string, questions: Array<QuestionSchema> = []) {
        this.device_id = device_id;
        this.questions = questions;
    }

    toJson(){
        return {
            'device_id' : this.device_id,
            'questions' : this.questions
        }
    }

    getID(){
        return {
            'device_id' : this.device_id
        }
    }
}
