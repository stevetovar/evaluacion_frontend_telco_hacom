import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'printyear'
})

export class PrintyearPipe implements PipeTransform {
    // transform(value: unknown, ...args: unknown[]): unknown {
    transform(date: string | undefined | null): string {
        if (!date) return '';
        return new  Date(date).getFullYear().toString();
    }
}
