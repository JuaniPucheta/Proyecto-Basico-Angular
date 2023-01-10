import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {

  transform(sexo: string, ...args: unknown[]): string {
    if (sexo === 'female') {
      return 'Mujer';
    }
    else {
      return 'Hombre';
    }
  }

}
