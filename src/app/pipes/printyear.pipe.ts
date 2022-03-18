import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'printyear'
})

export class PrintyearPipe implements PipeTransform {
    // transform(value: unknown, ...args: unknown[]): unknown {
    transform(date: string | number | undefined | null ): string {
        if (!date) return '';
        if (typeof date == 'number' || date.length < 5) return new Date(date.toString()).getFullYear().toString();
        return new Date(date).getFullYear().toString();
    }
}
