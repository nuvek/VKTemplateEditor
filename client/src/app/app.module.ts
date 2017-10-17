import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {TemplateModule} from './components/template/module';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {routing} from './app.routing';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        TemplateModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }