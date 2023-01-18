import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class PreloadingOptions{
  constructor(public routePath: string, public preload: boolean = true){}
}

@Injectable({
  providedIn: 'root'
})
export class PreloadingService {


  // Un Subject es un tipo de Observable que permite emitir valores a quien este suscrito a el
  // a traves del metodo .next(nuevoValor)
  private _subject = new Subject<PreloadingOptions>();

  // Cualquier Subject puede ser tratado como un Observable y es el que tenemos
  // que hacer publico. Con él vamos a ofrecer las opciones de ruta que desea ser precargada como un Observable
  public options$ = this._subject.asObservable();

  constructor() { }

  /**
   * Metodo encargado de iniciar una evaluacion de precarga
   * @param routePath Ruta que se desea precargar
   */
  comenzarPrecarga(routePath: string) {
    // Creamos unas opciones de precarga
    const opcionesPrecarga: PreloadingOptions = new PreloadingOptions(routePath, true);

    // Emitimos las opciones que desean ser precargadas.
    // Esta informacion la va a escuchar la estrategia de precarga
    // {ON-DEMAND-PRELOADING-STRATEGY}
    // para asi evaluar si se debe o no debe precargar la ruta
    this._subject.next(opcionesPrecarga);
  }
}
