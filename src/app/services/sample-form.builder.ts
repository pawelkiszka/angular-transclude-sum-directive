import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class SampleFormBuilder {
    private totalValueControl: FormControl;
    private averageValueControl: FormControl;
    private valuesCountControl: FormControl;
    private inputsFormGroup: FormGroup;

    constructor(@Inject(FormBuilder) private readonly formBuilder: FormBuilder) {
    }

    public totalValue(attributes: ControlBuilderAttributes): SampleFormBuilder {
        this.totalValueControl = this.generateReadonlyFormControl(attributes)
        return this;
    }

    public averageValue(attributes: ControlBuilderAttributes): SampleFormBuilder {
        this.averageValueControl = this.generateReadonlyFormControl(attributes);
        return this;
    }

    public countValues(attributes: ControlBuilderAttributes): SampleFormBuilder {
        this.valuesCountControl = this.generateReadonlyFormControl(attributes);
        return this;
    }

    private generateReadonlyFormControl(attributes: ControlBuilderAttributes): FormControl {
        const formControl = new FormControl('', {
            validators: [
                Validators.min(attributes.min),
                Validators.max(attributes.max)
            ]
        });
        formControl.markAsTouched();
        return formControl;
    }

    public inputs(identifiableAttributesGroup: { id: string, attributes: ControlBuilderAttributes }[]): SampleFormBuilder {
        const controlsContainer = {};
        identifiableAttributesGroup.forEach(identifiableAttribute =>
            controlsContainer[identifiableAttribute.id] = this.generateInputFormControl(identifiableAttribute.attributes)
        );
        this.inputsFormGroup = this.formBuilder.group(controlsContainer);
        return this;
    }

    private generateInputFormControl(attributes: ControlBuilderAttributes): FormControl {
        return new FormControl('', {
            validators: [
                Validators.min(attributes.min),
                Validators.max(attributes.max)
            ],
            updateOn: 'blur'
        })
    }

    public buildForm(): FormGroup {
        return this.formBuilder.group({
            [SampleFormBuilderKeys.TOTAL_VALUE]: this.totalValueControl,
            [SampleFormBuilderKeys.AVERAGE_VALUE]: this.averageValueControl,
            [SampleFormBuilderKeys.COUNT_VALUES]: this.valuesCountControl,
            [SampleFormBuilderKeys.INPUTS]: this.inputsFormGroup,
        })
    }
}

export interface ControlBuilderAttributes {
    min?: number;
    max?: number;
}

export enum SampleFormBuilderKeys {
    INPUTS = 'INPUTS',
    TOTAL_VALUE = 'TOTAL_VALUE',
    AVERAGE_VALUE = 'AVERAGE_VALUE',
    COUNT_VALUES = 'COUNT_VALUES'
}

const getControlByKey = (key: SampleFormBuilderKeys, parentForm: FormGroup) => parentForm.controls[key]

export const getTotalValueControl = (parentForm: FormGroup): AbstractControl =>
    getControlByKey(SampleFormBuilderKeys.TOTAL_VALUE, parentForm);

export const getAverageValueControl = (parentForm: FormGroup): AbstractControl =>
    getControlByKey(SampleFormBuilderKeys.AVERAGE_VALUE, parentForm);

export const getCountValuesControl = (parentForm: FormGroup): AbstractControl =>
    getControlByKey(SampleFormBuilderKeys.COUNT_VALUES, parentForm);

export const getInputsFormGroup = (parentForm: FormGroup): FormGroup =>
    getControlByKey(SampleFormBuilderKeys.INPUTS, parentForm) as FormGroup;