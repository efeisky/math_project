import { RequestMethod } from "../enums/request_method";
import { RequestUrl } from "../enums/request_url";
import { UrltoEnum, MethodtoEnum } from "../helpers/string_enumizer";
import { Request, Response } from "express";

export abstract class RequestRoute{
    
    protected request: Request;
    protected response: Response;
    protected requestInfo: { url: RequestUrl, method: RequestMethod };

    
    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;

        this.requestInfo = {
            url: UrltoEnum(req.url),
            method: MethodtoEnum(req.method)
        }
    }
}