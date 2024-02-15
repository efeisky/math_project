export class QuestionSchema {
    public questionSubject: string;
    public questionContent: string;
    public questionLevel: number;
    public questionDate: Date;
    public A: string;
    public B: string;
    public C: string;
    public D: string;
    public trueAnswer: number;
    public userChoice: number;
    public id: number = 0;
    public isDidTrue : boolean = false;

    constructor() {
        this.questionContent = '';
        this.questionLevel = 0;
        this.questionDate = new Date();
        this.questionSubject = '';
        this.A = '';
        this.B = '';
        this.C = '';
        this.D = '';
        this.trueAnswer = 0;
        this.userChoice = 0;
    }

    fromJSON(json: { [key: string]: string | number |Date }) {
        if (json['question-content']) {
            this.questionContent = json['question-content'] as string;
        }
        if (json['question-level']) {
            this.questionLevel = json['question-level'] as number;
        }
        if (json['question-subject']) {
            this.questionSubject = json['question-subject'] as string;
        }
        if (json['question-date']) {
            this.questionDate = json['question-date'] as Date;
        }
        if (json['A']) {
            this.A = json['A'] as string;
        }
        if (json['B']) {
            this.B = json['B'] as string;
        }
        if (json['C']) {
            this.C = json['C'] as string;
        }
        if (json['D']) {
            this.D = json['D'] as string;
        }
        if (json['true-answer']) {
            this.trueAnswer = json['true-answer'] as number;
        }
        if (json['user-choice']) {
            this.userChoice = json['user-choice'] as number;
        }
    }
    
    toJSON(){
        return {
            'question-content': this.questionContent,
            'question-level': this.questionLevel,
            'question-subject': this.questionSubject,
            'question-date': this.questionDate,
            'A': this.A,
            'B': this.B,
            'C': this.C,
            'D': this.D,
            'true-answer': this.trueAnswer,
            'user-choice': this.userChoice,
            'id' : this.id,
            'is-did-true' : this.isDidTrue
        }
    }
}