import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractYoutubeId'
})
export class ExtractYoutubeIdPipe implements PipeTransform {
  transform(url: string): string {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : '';
  }
}