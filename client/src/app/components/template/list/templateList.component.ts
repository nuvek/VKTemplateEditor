import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Router} from "@angular/router";

import {TemplateItem} from '../../../models/TemplateItem';
import {TemplateService} from '../../../services/template.service';
import {MatPaginator} from "@angular/material";

@Component({
    selector: 'template-list',
    templateUrl: './templateList.component.html',
    styles: [require('./templateList.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class TemplateListComponent implements OnInit {
    private displayedColumns : string[] = ['id', 'title', 'description', 'actions'];
    private dataSource: TemplateDataSource;
    @ViewChild(MatPaginator)
    private paginator: MatPaginator;

    public constructor(
        private router: Router,
        private templateService : TemplateService
    ) {
    }

    ngOnInit(): void {
        this.setDataSource();
    }

    private addTemplate() : void {
        this.router.navigate(['/template', 0]);
    }

    private edit(id:number) : void {
        this.router.navigate(['/template', id]);
    }

    private render(id:number) : void {
        this.router.navigate(['/template/render', id]);
    }

    private onPaginateChange(event:any) : void {
        this.setDataSource();
    }

    private setDataSource() : void {
        this.dataSource = new TemplateDataSource(this.templateService, this.paginator);
    }
}


export class TemplateDataSource extends DataSource<any> {
    public total : number = 0;
    public constructor(private templateService : TemplateService, private paginator:MatPaginator) {
        super();
    }

    connect(): Observable<TemplateItem[]> {
        return this.templateService.getTemplateList(this.paginator.pageIndex, this.paginator.pageSize)
            .map((result:any)=>this.processTemplateItems(result));
    }

    private processTemplateItems(result:any) : TemplateItem[] {
        this.total = result.total;
        return result.data;
    }

    disconnect(): void {
    }
}