import { Pipe, PipeTransform } from '@angular/core';
import {isNumber} from "util";

@Pipe({
  name: 'danishWeekday'
})
export class DanishWeekdayPipe implements PipeTransform {

  private danishWeekday: string;

  transform(date: string, args?: any): any {

    switch (new Date(date).getDay()) {
      case 1:
        return 'Mandag';
      case 2:
        return 'Tirsdag';
      case 3:
        return 'Onsdag';
      case 4:
        return 'Torsdag';
      case 5:
        return 'Fredag';
      case 6:
        return 'Lørdag';
      case 7:
        return 'Søndag';
    }
  }

}


