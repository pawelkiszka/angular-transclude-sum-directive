import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { TotalValueUpdaterDirective } from './directives/total-value-updater.directive';
import { AverageValueUpdaterDirective } from './directives/average-value-updater.directive';
import { CountValuesUpdaterDirective } from './directives/count-values-updater.directive';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        SampleFormComponent,
        TotalValueUpdaterDirective,
        AverageValueUpdaterDirective,
        CountValuesUpdaterDirective
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        BrowserAnimationsModule
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
