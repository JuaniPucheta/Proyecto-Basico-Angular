import { Directive, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLifeCycle]'
})
export class LifeCycleDirective implements OnInit, OnDestroy, OnChanges {

  constructor() { }

  ngOnInit(): void {
    this.lifeCycle('OnInit');
  }

  ngOnDestroy(): void {
    this.lifeCycle('OnDestroy');
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.lifeCycle('OnChanges');
   }

  lifeCycle(hook: string, changes?: SimpleChanges) {
    console.log(`CICLO DE VIDA: ${hook}`);
    if (changes) {
      console.log(`Cambios: ${JSON.stringify(changes)}`);
    }
  }

}
