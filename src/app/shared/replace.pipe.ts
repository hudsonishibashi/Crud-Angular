import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replace"
})
export class ReplacePipe implements PipeTransform {
  constructor() {}
  transform(item: any, replace: any, replacement: any): any {
    if (item == null) return '';
    item = item.replace(replace, replacement);
    return item;
  }
}