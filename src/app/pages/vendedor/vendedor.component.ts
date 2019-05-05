import { Component, OnInit } from '@angular/core';
import { VendedorService } from '@app/_services';
import { Vendedor } from '@app/_models';
import { ImageUtilService } from '@app/_helpers';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {
  _idvendedor: string;
  _vendedor: Vendedor = null;
  vendedorAvatar;

  setAvatar()
  {
    if (this._vendedor.foto) {
      var gh='';
      if(this._vendedor.foto.indexOf('data:image')<0)
      {
          gh='data:image/png;base64,';
      }
      this.vendedorAvatar = this.sanitizer.bypassSecurityTrustUrl(gh + this._vendedor.foto);
    } else
    {
       this.vendedorAvatar = '../../../assets/images/user.png';
    }
  }

  constructor(
    private vendedorService: VendedorService,
    private imageUtil: ImageUtilService,
    private sanitizer: DomSanitizer
  ) { }

  initializeVendedor(): void {
    if (parseInt(this._idvendedor)>0) {
    this.vendedorService.getById(parseInt(this._idvendedor))
    .subscribe(vend => {
      this._vendedor = vend;
      console.log(vend);
      this.setAvatar();
      });
    }
  }

  ngOnInit() {
       var id=localStorage.getItem('vendedor');
       if (id) {
        this._idvendedor=id;
        this.initializeVendedor();
       }
       else
       {
         this._idvendedor="0";
       }
  }

  sanitizePicture(vr){
    return this.imageUtil.sanitizePicture(vr);
  }
}
