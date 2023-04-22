import { DatePipe } from '@angular/common';

export class Utils {


   static transformDate(date: string, format: string, location: string, toUS?: boolean): string {
    const datePipe = new DatePipe(location);
    const transformedDate = !toUS ?  datePipe.transform(date, format) : datePipe.transform(date, 'dd-MM-yyyy', '+0000');
    return transformedDate;
  }


  static transformToDate(date: string, format: string, location: string): Date {
    const datePipe = new DatePipe(location);
    const transformedDate = datePipe.transform(date, format);
    return transformedDate ? new Date(transformedDate) : null;
  }

}
