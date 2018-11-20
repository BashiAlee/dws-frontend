import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchUser: string): any[] {
    if (!items) return [];
    if (!searchUser) return items;
    searchUser = searchUser.toLowerCase();
    if(items) {
      return items.filter(it => {
        return it.FirstName.toLowerCase().includes(searchUser) || it.MiddleName.toLowerCase().includes(searchUser) || it.LastName.toLowerCase().includes(searchUser);
      });
    }
  }
}
