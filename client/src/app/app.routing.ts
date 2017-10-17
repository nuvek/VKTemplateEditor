import { Routes, RouterModule } from '@angular/router';
import {TemplateListComponent} from "./components/template/list/templateList.component";
import {TemplateEditorComponent} from "./components/template/editor/templateEditor.component";
import {TemplateRendererComponent} from "./components/template/renderer/templateRenderer.component";

export const routes: Routes = [
    { path: 'templates', component: TemplateListComponent, data : { title : 'Templates List' } },
    { path: 'template/:id', component: TemplateEditorComponent, data : { title : 'Template Editor' } },
    { path: 'template/render/:id', component: TemplateRendererComponent, data : { title : 'Template Renderer' } },
    { path: '', redirectTo: 'templates', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });