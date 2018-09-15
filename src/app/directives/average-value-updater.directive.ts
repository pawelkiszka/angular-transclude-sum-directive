import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isNumber } from 'util';

@Directive({
    selector: '[appAverageValueUpdater]'
})
export class AverageValueUpdaterDirective {

    @Input('appAverageValueUpdater')
    public averageValueControl: AbstractControl;
    @Input('inputsFormGroup')
    public inputsFormGroup: FormGroup;

    private updateAverageValueControlSubscription: Subscription;

    public ngOnInit(): void {
        this.updateAverageValueControlSubscription = this.inputsFormGroup.valueChanges.pipe(
            map(Object.values),
            map(this.extractAverageValue),
        ).subscribe(
            (averageValue: number) => this.averageValueControl.setValue(averageValue.toFixed(2))
        );
    }

    private extractAverageValue(stringValues: string[]): number {
        const numericValues: number[] = stringValues
            .map((value: string) => Number(value))
            .filter((value: number) => isNumber(value));
        const totalValue = numericValues.reduce((prev, curr) => prev + curr, 0);
        const countOfNonZeroValues = numericValues
            .filter((value: number) => value > 0)
            .length;
        return countOfNonZeroValues > 0
            ? totalValue / countOfNonZeroValues
            : 0;
    }

    public ngOnDestroy(): void {
        this.updateAverageValueControlSubscription.unsubscribe();
    }
}
