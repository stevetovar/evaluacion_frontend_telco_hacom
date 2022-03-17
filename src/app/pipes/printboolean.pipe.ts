import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'printboolean'
})

export class PrintbooleanPipe implements PipeTransform {
    // transform(value: unknown, ...args: unknown[]): unknown {
    transform(booleanValue: boolean | undefined | null): string {
        if (booleanValue === true) return 'Sí';
        if (booleanValue === false) return 'No';
        return '';
    }
}
