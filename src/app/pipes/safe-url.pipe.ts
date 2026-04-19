import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(url: string | String): SafeUrl {
    const stringUrl: string = url.toString();
    return this.sanitizer.bypassSecurityTrustResourceUrl(stringUrl);
  }
}
