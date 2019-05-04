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
      //if (this.isBase64(vr)) {
      if (vr.length>200) {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + vr);
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
