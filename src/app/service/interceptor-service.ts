import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    constructor(private tokenService: TokenService){}

    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let intReq = req;
        const token = this.tokenService.getToken();
        if(token != null){
            intReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' +token)
            });
        }
        return next.handle(intReq);
    }
}


export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useCass: InterceptorService,
    multi: true
}];

//Falta agregar interceptorProvider en app.module.ts, este no funciona por alguna razón por lo cual lo retiré
//  providers: [
//
//],