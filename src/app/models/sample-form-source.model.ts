import { v4 as uuid } from 'uuid';
import { ControlBuilderAttributes } from '../services/sample-form.builder';

export const totalValueConstrains: ControlBuilderAttributes = {
    min: 100,
    max: 1000
}

export const averageValueContrains: ControlBuilderAttributes = {
    min: 40,
    max: 80
}

export const countValuesContrains: ControlBuilderAttributes = {
    min: 1,
    max: 10
}

export const generateRandomInputContrains = (): ControlBuilderAttributes => ({
    min: randomInteger(0, 50),
    max: randomInteger(50, 100)
})

const randomInteger = (min: number, max: number) => Math.floor(Math.random() * max) + min

export const generateUniqueId = () => uuid()