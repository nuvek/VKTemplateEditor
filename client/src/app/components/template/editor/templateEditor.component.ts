import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import {TemplateService} from '../../../services/template.service';
import {TemplateItem} from '../../../models/TemplateItem';
import {CKEditorConfig} from '../../../models/CKEditorConfig';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector : 'template-editor',
    templateUrl: './templateEditor.component.html',
    styles: [require('./templateEditor.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class TemplateEditorComponent implements OnInit{
    @Input() templateItem: TemplateItem;
    private _ckEditorConfig = CKEditorConfig;

    public constructor(
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
            .then((templateItem : TemplateItem) => this.templateItem = templateItem);
    }

    private save() : void {
        this.templateService.saveTemplateItem(this.templateItem)
            .then(templateItem => this.cancel());
    }

    private cancel() : void {
        this.router.navigate(['/templates']);
    }
}