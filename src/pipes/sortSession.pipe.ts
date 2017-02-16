import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "sortSessions",
  pure: false
})

export class SortSessions implements PipeTransform {

  transform(a: Array<any>): Array<any> {

    a.sort((e1: any, e2: any) => {
      let date1 = e1.session.dateBegin
      let date2 = e2.session.dateBegin
      if(date1 && date2) {

        if(date1.isBefore(date2)) return -1;
        else if(date2.isBefore(date1)) return 1
        else return e1.session.title.localeCompare(e2.session.title);
      }
    })

    return a
  }

}
