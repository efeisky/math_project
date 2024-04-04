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

class QuestionAISchema{
    private questionSubject: string;
    private questionContent: string;
    private questionLevel: number;
    private questionDate: Date;
    private A: string;
    private B: string;
    private C: string;
    private D: string;
    private trueAnswer: number;
    private userChoice: number;

    constructor(data : any, subject : string) {
        this.questionContent = data['content'];
        this.questionLevel = data['level'];
        this.questionDate = new Date();
        this.questionSubject = subject;
        this.A = data['a'];
        this.B = data['b'];
        this.C = data['c'];
        this.D = data['d'];
        this.trueAnswer = data['answer'];
        this.userChoice = 0;
    }

    public get getContent() : string {return this.questionContent};
    public get getSubject() : string {return this.questionSubject};
    public get getLevel() : number {return this.questionLevel};
    public get getDate() : Date {return this.questionDate};
    public get getA() : string {return this.A};
    public get getB() : string {return this.B};
    public get getC() : string {return this.C};
    public get getD() : string {return this.D};
    public get getUserChoice() : number {return this.userChoice};
    public get getTrueAnswer() : number {return this.trueAnswer};
    
    
}

export  { QuestionRequestBodySchema, QuestionAISchema};
