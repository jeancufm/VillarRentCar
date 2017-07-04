import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bandera'
})
export class BanderaPipe implements PipeTransform {
  transform(value: string): string {
    return "assets/img/banderas/"+value+".gif";
  }
}
