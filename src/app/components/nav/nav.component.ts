import { Component, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { PreloadingService } from 'src/app/services/preloading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private _preloadingService: PreloadingService
  ) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe(value => {
      const darkModeClass = 'darkMode';
      this.className = value ? darkModeClass : '';

      const classes = this.overlayContainer.getContainerElement().classList;
      if (value) {
        classes.add(darkModeClass);
      }
      else {
        classes.remove(darkModeClass);
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  /**
   * Metodo encargado de precargar un modulo del sistema de rutas de la aplicacion
   * @param ruta ruta para cargar el modulo
   */
  precargarModulo(ruta: string) {
    this._preloadingService.comenzarPrecarga(ruta);
  }

}
