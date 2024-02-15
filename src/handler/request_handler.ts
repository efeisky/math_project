import { RequestUrl } from "../enums/request_url";
import CreateQuestionRoute from "../routes/create_question_route";
import GetAnaliticsRoute from "../routes/get_analitics_route";
import SetDeviceIdRoute from "../routes/set_device_id_route";
import { RequestRoute } from "./request_route";

export class RequestHandler extends RequestRoute{

    handleRequest() {
        this.routeRequest();
    }

    private routeRequest() {
        switch (this.requestInfo.url) {
            case RequestUrl.createQuestion:
                new CreateQuestionRoute(this.request, this.response)
                break;
            
            case RequestUrl.setDeviceId:
                new SetDeviceIdRoute(this.request, this.response)
                break;
            
            case RequestUrl.getAnalitics:
                new GetAnaliticsRoute(this.request, this.response)
                break;

            default:
                this.setRouteError();
                break;
        }
    }

    private setRouteError(){
        this.response.sendStatus(404)
    }
}
