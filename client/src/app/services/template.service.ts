import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions} from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {TemplateItem} from '../models/TemplateItem';

@Injectable()
export class TemplateService {
    public constructor(
        @Inject(Http) private http: Http
    ) {}

    public getTemplateList(pageIndex: number, pageSize: number) : Observable<any> {
        let options = new RequestOptions({ params: {
            pageIndex : pageIndex,
            pageSize: pageSize
        } });

        return this.http.get('/api/templates', options)
            .map((response:Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public saveTemplateItem(templateItem : TemplateItem) : Promise<TemplateItem> {
        return this.http.post('/api/template/save', templateItem)
            .toPromise()
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    public getTemplateItem(templateItemId:string) : Promise<TemplateItem> {
        return this.http.get('/api/templates/get/' + templateItemId)
            .toPromise()
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        console.log(error);
        return Promise.reject(error);
    }
}