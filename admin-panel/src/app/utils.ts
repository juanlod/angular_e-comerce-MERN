import { DatePipe } from '@angular/common';

export class Utils {


   static transformDate(date: string, format: string, location: string): string {
    const datePipe = new DatePipe(location);
    const transformedDate = datePipe.transform(date, format);
    return transformedDate;
  }
}
