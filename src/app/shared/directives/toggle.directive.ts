import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[toggle]'
})
export class ToogleDirective {
  @Input('toggle') class: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click', ['$event.target']) onClick(event: Event) {
    if (this.el.nativeElement.classList.contains(this.class)) {
      this.renderer.removeClass(this.el.nativeElement, this.class)
    } else {
      this.renderer.addClass(this.el.nativeElement, this.class)
    }
  }
}
