import { QuestionAISchema } from "./question_schemas";

class AISchema {
    private questions : Array<QuestionAISchema> = [];

    private constructor(data: any, subject : string) {
        var questionsList = data['questions']
        this.questions = questionsList.map((questionData: any) => new QuestionAISchema(questionData, subject));
    }
    
    public static setSchema(data : object, subject : string) {
        return new AISchema(data, subject)
    };
    
    
    public get questionsListGet() : Array<QuestionAISchema> {
        return this.questions;
    }
    
}



export  { AISchema };
