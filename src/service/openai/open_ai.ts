import OpenAI from "openai";

export class OpenAIConnection {

    private openai = new OpenAI({
        organization: 'org-1QzJUZFHJcGY87UOIFLA3vbs',
        apiKey : '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'
      });

    
    private system_content = `
        Sen bir eğitim amaçlı soru üreticisin. Kullanıcıdan konu içeriği ve soru zorluğunu alarak onunla alakalı sorular üreteceksin. Üreteceğin format aşağıda yer almaktadır
    
        {
        status : true
        level : bu sana 1 2 3 şeklinde verilebilir sen de kolay orta zor olarak soruları oluşturacaksın sonrasında buraya 1, 2 veya 3 yazacaksın
        type : Soru Tipi, resimli ise image, resimsiz ise standart
        content : Soru İçeriği
        a : A şıkkı
        b : B şıkkı
        c : C şıkkı
        d : D şıkkı
        answer : Soru Cevabı A ise 1, B ise 2, C ise 3, D ise 4,
        image : bu oladabilir olmayadabilir ama olacaksa internetten konu veya soruyla alakalı bulacağın bir görselin urlini istiyorum
        }
    
        Eğer soru üretemiyorsan 
        {
        status : false
        }
        döndür ve hiç bir cevap verme. Vereceğin cevaplar yukarıdaki formatlarda olmak zorundadır.
    
        Sadece bu jsonu döndür. Başka mesaj döndürme!
    `
    private userSubject : string;
    
    constructor(subject : string) {
        this.userSubject = subject
        this.create();
    }

    async create(): Promise<boolean> {
        const completion = await this.openai.chat.completions.create({
            model : 'gpt-3.5-turbo-instruct',
            messages: [
                { role: "system", content: this.system_content },
                { role: "user", content: this.userSubject },
            ],

        })
        const content = completion.choices[0].message.content;
        console.log(content)
        return true;
    }
}

