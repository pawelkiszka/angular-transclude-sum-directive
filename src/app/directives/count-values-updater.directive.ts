import { Directive, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isNumber } from 'util';

@Directive({
    selector: '[appCountValuesUpdater]'
})
export class CountValuesUpdaterDirective {

    @Input('appCountValuesUpdater')
    public countValuesControl: AbstractControl;
    @Input('inputsFormGroup')
    public inputsFormGroup: FormGroup;

    private updateCountValuesControlSubscription: Subscription;

    public ngOnInit(): void {
        this.updateCountValuesControlSubscription = this.inputsFormGroup.valueChanges.pipe(
            map(Object.values),
            map(this.countNonZeroValues)
        ).subscribe(
            countValues => this.countValuesControl.setValue(countValues.toFixed(0))
        );
    }

    private countNonZeroValues(valuesArray: string[]): number {
        return valuesArray
            .map((value: string) => Number(value))
            .filter((value: number) => isNumber(value) && Number(value) > 0)
            .length
    }

    public ngOnDestroy(): void {
        this.updateCountValuesControlSubscription.unsubscribe();
    }
}
