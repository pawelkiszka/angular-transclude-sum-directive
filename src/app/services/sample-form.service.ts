import { Injectable, Inject } from "@angular/core";
import { SampleFormBuilder } from "./sample-form.builder";
import { FormGroup } from "@angular/forms";
import { totalValueConstrains, averageValueContrains, countValuesContrains, generateUniqueId, generateRandomInputContrains } from "../models/sample-form-source.model";


@Injectable({
    providedIn: 'root'
})
export class SampleFormService {

    constructor(@Inject(SampleFormBuilder) private readonly formBuilder: SampleFormBuilder) {
    }

    public buildForm(): FormGroup {
        return this.formBuilder
            .totalValue(totalValueConstrains)
            .averageValue(averageValueContrains)
            .countValues(countValuesContrains)
            .inputs([
                {
                    id: generateUniqueId(),
                    attributes: generateRandomInputContrains()
                },
                {
                    id: generateUniqueId(),
                    attributes: generateRandomInputContrains()
                },
                {
                    id: generateUniqueId(),
                    attributes: generateRandomInputContrains()
                },
                {
                    id: generateUniqueId(),
                    attributes: generateRandomInputContrains()
                }
            ])
            .buildForm();
    }


}
