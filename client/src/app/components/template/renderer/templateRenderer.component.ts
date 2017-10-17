import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import {TemplateService} from '../../../services/template.service';
import {TemplateItem} from '../../../models/TemplateItem';
import {TemplateField} from '../../../models/TemplateField';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'template-renderer',
    templateUrl: './templateRenderer.component.html',
    styles: [require('./templateRenderer.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class TemplateRendererComponent implements OnInit{
    @Input() templateItem: TemplateItem;
    private _templateFields : TemplateField[] = [];
    private _result : string = '';

    public  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private templateService : TemplateService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(p => this.getTemplateItem(p && p['id']));
    }

    private getTemplateItem(id:string) : void {
        if(!id || id === '0'){
            this.templateItem = new TemplateItem();
            return;
        }
        this.templateService.getTemplateItem(id)
            .then((templateItem : TemplateItem) => this.processTemplateItem(templateItem));
    }

    private processTemplateItem(templateItem : TemplateItem) {
        //let placeHolders = templateItem.content.match();
        let regexp = /\$\{([^\}]+)\}/g;
        this._templateFields = [];
        let foundPlaceHolders:any = {};
        let match = regexp.exec(templateItem.content);
        while(match) {
            let name = match[1];
            if(foundPlaceHolders[name])
                return;
            let templateField = new TemplateField();
            templateField.name = name;
            templateField.label = name;
            templateField.value = '';
            this._templateFields.push(templateField);
            foundPlaceHolders[name] = true;
            match = regexp.exec(templateItem.content);
        }
        this.templateItem = templateItem;
        this.renderTemplate();
    }

    private renderTemplate() : void {
        let result = this.templateItem.content;
        this._templateFields.forEach((templateField) => {
            result = result.replace('${' + templateField.name + '}', templateField.value);
        });
        this._result = result;
    }

    private cancel() : void {
        this.router.navigate(['/templates']);
    }

}