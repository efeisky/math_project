import { RequestMethod } from "../enums/request_method"
import { RequestUrl } from "../enums/request_url"

function MethodtoEnum(method : string = '') : RequestMethod {
    switch (method) {
        case 'GET':
            return RequestMethod.GET
        case 'POST':
            return RequestMethod.POST
        
        case 'UPDATE':
            return RequestMethod.UPDATE
        
        case 'DELETE':
            return RequestMethod.DELETE
    
        default:
            return RequestMethod.NORMAL
    }
}
function UrltoEnum(url : string = '') : RequestUrl {
    url = url.substring(1)
    switch (url) {
        case 'createQuestion':
            return RequestUrl.createQuestion
        case 'setDeviceId':
            return RequestUrl.setDeviceId
        
        case 'getAnalitics':
            return RequestUrl.getAnalitics
        
        default:
            return RequestUrl.NORMAL
    }
}

export { MethodtoEnum, UrltoEnum}