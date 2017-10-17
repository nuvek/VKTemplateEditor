import { NgModule } from '@angular/core';
import {TemplateListComponent} from './list/templateList.component';
import {TemplateEditorComponent} from './editor/templateEditor.component';
import {TemplateRendererComponent} from './renderer/templateRenderer.component';
import {AppMaterialModule} from '../../material.module';
import {TemplateService} from '../../services/template.service';
import {EscapeHtmlPipe} from '../../pipes/escapeHtml.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CKEditorModule} from 'ng2-ckeditor'

@NgModule({
    imports : [
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        CommonModule,
        CKEditorModule
    ],
    declarations: [
        TemplateListComponent,
        TemplateEditorComponent,
        TemplateRendererComponent,
        EscapeHtmlPipe
    ],
    exports: [
        TemplateListComponent,
        TemplateEditorComponent,
        TemplateRendererComponent
    ],
    providers: [
        TemplateService
    ]
})
export class TemplateModule { }
