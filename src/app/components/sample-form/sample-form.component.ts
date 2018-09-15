import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { SampleFormService } from '../../services/sample-form.service';
import { getTotalValueControl, getAverageValueControl, getCountValuesControl, getInputsFormGroup } from '../../services/sample-form.builder';

@Component({
    selector: 'app-sample-form',
    templateUrl: './sample-form.component.html',
    styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent implements OnInit {
    public objectKeys = Object.keys;

    public form: FormGroup;
    public totalValueControl: AbstractControl;
    public averageValueControl: AbstractControl;
    public countValuesControl: AbstractControl;
    public inputsFormGroup: FormGroup;

    constructor(@Inject(SampleFormService) private readonly formService: SampleFormService) {
    }

    public ngOnInit(): void {
        this.form = this.formService.buildForm();
        this.totalValueControl = getTotalValueControl(this.form);
        this.averageValueControl = getAverageValueControl(this.form);
        this.countValuesControl = getCountValuesControl(this.form);
        this.inputsFormGroup = getInputsFormGroup(this.form);
    }
}
