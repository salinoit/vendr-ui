import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  isBase64(str): boolean {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
  }
  sanitizePicture(vr){
    if (vr) {
      if (vr.length>200) {
        var gh='';
        if(vr.indexOf('data:image')<0 && vr.indexOf('http:')<0)
        {
            gh='data:image/png;base64,';
            return this.sanitizer.bypassSecurityTrustUrl(gh + vr);
        }
        else
        {
          if (vr.indexOf('http:')>0)
          {
            return vr;
          }
        }
      } else
      {
        return '../../../assets/images/p2.jpg';
      }
    } else
    {
      return '../../../assets/images/p2.jpg';
    }
  }

}
