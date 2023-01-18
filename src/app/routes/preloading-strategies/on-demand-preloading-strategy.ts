import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY, mergeMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreloadingOptions, PreloadingService } from 'src/app/services/preloading.service';

@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadStrategy implements PreloadingStrategy {

  private _preloadDemandOptions$: Observable<PreloadingOptions>;

  constructor(private _preloadingService: PreloadingService) {
    this._preloadDemandOptions$ = this._preloadingService.options$;
  }

  private decidirSiPreargar(route: Route, preloadingOptions: PreloadingOptions): boolean {
    // Si:
    // 1. La ruta tiene la propiedad 'data'
    // 2. La ruta tiene la propiedad 'data.preload' a true
    // 3. La ruta esta inlcuida en la lista de rutas a precargar
    // 4. Las opciones tienen preload a true
    // Aqui podemos añadir mas condiciones totalmente personalizadas
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadingOptions.routePath) &&
      preloadingOptions.preload // true
    )
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    // Estamos escuchando los valores de opciones de precarga emitidos por el next() del servicio
    return this._preloadDemandOptions$.pipe(
      // Itermaos por cada valor recibido desde el servicio con el next()
      mergeMap((preloadingOptions: PreloadingOptions) => {
        // Comprobamos si se debe cargar o no bajo estas opciones
        const precargar: boolean = this.decidirSiPreargar(route, preloadingOptions);
        // Mostramos por consola si se precarga o no el modulo:
        console.log(`[OnDemandPreloadingStrategy] ${precargar ? 'Precargando' : 'No precargando'} el modulo: ${route.path}`);
        // Devolvemos la ejecucion del callback load() o nada
        return precargar ? load() : EMPTY;
      })
    )
  }

}
