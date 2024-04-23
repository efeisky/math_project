import OpenAI from "openai";
import { AISchema } from "../../class/ai_schemas";
export class OpenAIConnection {

    private openai = new OpenAI({
        organization: process.env.ORG_ID,
        apiKey : process.env.API_KEY
      });

    
    private system_content = `
    Sen soru üreticisin.Kullanıcıdan konu içeriği ve soru zorluğunu alarak onunla alakalı 10 tane soru üreteceksin.
    {
    "status" : true,"questions":[{
    "id" : soru numarası
    "level" : 1, 2 veya 3
    "content" : Soru İçeriği
    "a" : A şık
    "b" : B şık
    "c" : C şık
    "d" : D şık
    "answer" : Soru Cevabı A 1, B 2, C 3, D 4
    }]}
    Eğer soru üretemiyorsan 
    {"status" : false}
    Mesajın sadece bunu içermeli.
    `
    private userSubject : string;
    
    constructor(subject : string) {
        this.userSubject = subject
    }

    async create(subject : string): Promise<{
        model : AISchema | null,
        status : boolean
    }> {
        let content;
        if(process.env.APP_STATUS == 'TEST'){
            content = `{"status":true,"questions":[{"id":1,"level":2,"content":"Üslü bir sayının tabanı a olup üssü b ise a^b işlemi sonucu kaçtır?","a":"a*b","b":"a+b","c":"a^b","d":"a/b","answer":3},{"id":2,"level":2,"content":"2^3 üssü kaçtır?","a":"4","b":"6","c":"8","d":"10","answer":3},{"id":3,"level":2,"content":"1'in herhangi bir üssü kaçtır?","a":"0","b":"1","c":"2","d":"3","answer":2},{"id":4,"level":2,"content":"3^2 işleminin sonucu kaçtır?","a":"5","b":"6","c":"7","d":"9","answer":4},{"id":5,"level":2,"content":"(-2)^3 işleminin sonucu kaçtır?","a":"-6","b":"-8","c":"-4","d":"8","answer":2},{"id":6,"level":2,"content":"Üslü bir sayının tabanı 5 olup üssü 0 ise sonuç kaçtır?","a":"0","b":"1","c":"5","d":"25","answer":2},{"id":7,"level":2,"content":"2^5 işleminin sonucu kaçtır?","a":"28","b":"32","c":"30","d":"34","answer":2},{"id":8,"level":2,"content":"(-3)^2 işleminin sonucu kaçtır?","a":"5","b":"9","c":"-6","d":"6","answer":2},{"id":9,"level":2,"content":"Üslü bir sayının tabanı 4 olup üssü -2 ise sonuç kaçtır?","a":"16","b":"1/16","c":"8","d":"1/8","answer":2},{"id":10,"level":2,"content":"5^0 işleminin sonucu kaçtır?","a":"0","b":"5","c":"1","d":"25","answer":3}]}`;
        }else if(process.env.APP_STATUS == 'DEPLOY'){
            var completion = await this.openai.chat.completions.create({
                model : process.env.OPENAI_VERSION == 'ADVANCED' ? 'gpt-4-turbo' : 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: this.system_content },
                    { role: "user", content: this.userSubject },
                ]
            })
            content = completion.choices[0].message.content;
        }else{return {model : null,status : false}}
        if (content == null) return {model : null,status : false};
        let checkedContent = await this.checkAndSetContent(content, subject);
        if (checkedContent == null) return {model : null,status : false};
        return {
            model : checkedContent,
            status : true
        };
    }

    private async checkAndSetContent(text: string, subject : string): Promise<AISchema | null> {
        try {
            var parsed = JSON.parse(text);
            if (parsed['status'] === true) {
                return AISchema.setSchema(parsed, subject);
            } else {
                return null;
            }
        } catch {
            return null;
        }
    }
}

