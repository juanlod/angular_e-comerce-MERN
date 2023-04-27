import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[icon]'
})
export class IconDirective {
  @Input() icon: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const iconElement = this.renderer.createElement('i');
    this.renderer.addClass(iconElement, this.icon);
    this.renderer.appendChild(this.elementRef.nativeElement, iconElement);
  }
}
