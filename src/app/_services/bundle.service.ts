import { Injectable } from '@angular/core';
import { Component, OnInit,Renderer2,RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT, } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BundleService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2, @Inject(DOCUMENT) private _document
  ) {    
    this.renderer = rendererFactory.createRenderer(null, null);
   }

  public AddScript(url:string):void {
    const s = this.renderer.createElement('script');
    s.src=url;
    this.renderer.appendChild(this._document.body, s); 
  }
}
