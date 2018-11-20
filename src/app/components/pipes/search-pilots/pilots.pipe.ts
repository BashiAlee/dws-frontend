import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pilots'
})
export class PilotsPipe implements PipeTransform {

  transform(items: any[], searchPilot: string): any[] {
    if (!items) return [];
    if (!searchPilot) return items;
    
    searchPilot = searchPilot.toLowerCase();
    if (items) {
      return items.filter(it => {
        return it.SenderFirstName.toLowerCase().includes(searchPilot) || it.SenderMiddleName.toLowerCase().includes(searchPilot) || it.SenderLastName.toLowerCase().includes(searchPilot);
      });
    }
  }

}
