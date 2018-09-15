import { Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { SampleFormComponent } from '../components/sample-form/sample-form.component';
import { Subscription } from 'rxjs';
import { AbstractControl, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { isNumber } from 'util';

@Directive({
    selector: '[appTotalValueUpdater]'
})
export class TotalValueUpdaterDirective implements OnInit, OnDestroy {

    @Input('appTotalValueUpdater')
    public totalValueControl: AbstractControl;
    @Input('inputsFormGroup')
    public inputsFormGroup: FormGroup;

    private updateTotalValueControlSubscription: Subscription;

    public ngOnInit(): void {
        this.updateTotalValueControlSubscription = this.inputsFormGroup.valueChanges.pipe(
            map(Object.values),
            map(this.extractTotalValue)
        ).subscribe(
            totalValue => this.totalValueControl.setValue(totalValue.toFixed(2))
        );
    }

    private extractTotalValue(valuesArray: string[]): number {
        return valuesArray
            .map((value: string) => Number(value))
            .filter((value: number) => isNumber(value))
            .reduce((prev, curr) => prev + curr, 0)
    }

    public ngOnDestroy(): void {
        this.updateTotalValueControlSubscription.unsubscribe();
    }
}
