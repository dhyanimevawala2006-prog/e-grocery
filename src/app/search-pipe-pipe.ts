import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchText: string): any[] {

    if (!data || !searchText) {
      return data;
    }

    searchText = searchText.toLowerCase();

    return data.filter(item =>

      // product fields
      item.pname?.toLowerCase().includes(searchText) ||


      item.description?.toLowerCase().includes(searchText) ||

      // order fields
      item._id?.toLowerCase().includes(searchText) ||

      // customer fields
      item.username?.toLowerCase().includes(searchText) ||

      item.email?.toLowerCase().includes(searchText) ||

      item.address?.name?.toLowerCase().includes(searchText) ||

      item.address?.phone?.toLowerCase().includes(searchText)

    );

 

  }

} 