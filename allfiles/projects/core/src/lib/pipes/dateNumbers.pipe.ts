import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateNumbers',
})
export class dateNumbersPipe implements PipeTransform {
    transform(value: any, type: string = 'numbers') {
        if(type == 'numbers'){
            var month = value % 100;
            var day = Math.floor(value % 10000 / 100);
            var year = Math.floor(value / 10000);
            var date = month + '.' + day + '.' + year;
            return date;
        }else if(type == 'time'){
            if(!value || value == '' || value < 1) return;
            value = value.trim();
            value = value.padStart(6);
            return value.substr(0, 2)+':'+value.substr(2, 2)+':'+value.substr(4, 2);
        }else if(type == 'timeshort'){
            if(!value || value == '' || value < 1) return;
            value = value.trim();
            value = value.replace('.', '');
            value = value.replace(':', '');
            value = value.padStart(4);
            return value.substr(0, 2)+':'+value.substr(2, 2);
        }else{
            var month = value % 100;
            var day = Math.floor(value % 10000 / 100);
            var year = Math.floor(value / 10000);
            var date = month + '.' + day + '.' + year; 
            return date;
        }
    }
}