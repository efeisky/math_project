class QuestionRequestBodySchema {
    private questionContent: string;
    private questionLevel: number;
    private deviceId: string;

    constructor() {
        this.questionContent = '';
        this.questionLevel = 0;
        this.deviceId = '';
    }

    fromJSON(json: { [key: string]: string | number }) {
        if (json['question-content']) {
            this.questionContent = json['question-content'] as string;
        }
        if (json['question-level']) {
            this.questionLevel = json['question-level'] as number;
        }
        if (json['device-id']) {
            this.deviceId = json['device-id'] as string;
        }
    }

    getContent() : string{
        return this.questionContent
    }

    getLevel() : number{
        return this.questionLevel
    }

    getDeviceID() : string{
        return this.deviceId
    }
}



export  { QuestionRequestBodySchema};
