import { isDevMode, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'static' })
export class StaticFilePipe implements PipeTransform {
  transform(value: string): string {
    if (!isDevMode()) {
      return window.location.href + value;
    } else {
      return value;
    }
  }
}
