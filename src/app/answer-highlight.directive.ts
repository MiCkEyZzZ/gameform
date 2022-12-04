import { Directive, ElementRef } from '@angular/core'
import { NgControl } from '@angular/forms'
import { map, filter } from 'rxjs/operators'

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private element: ElementRef, private controlName: NgControl) {}

   ngOnInit() {
    this.controlName.control?.parent?.valueChanges.pipe(
      map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))),
    )
    .subscribe((value) => {
      if (value < 0.2) {
        this.element.nativeElement.classList.add('text-green-500')
        this.element.nativeElement.classList.remove('text-red-500')
      } else {
        this.element.nativeElement.classList.remove('text-green-500')
        this.element.nativeElement.classList.add('text-red-500')
      }
    })
   }
}
