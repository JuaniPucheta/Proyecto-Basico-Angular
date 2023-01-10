import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { IRandomContact, Results } from '../models/randomuser';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  constructor(private http: HttpClient) { }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`Ha ocurrido un error: ${error.error}`);
    }
    else {
      console.error(`Ha ocurrido un error: ${error.status}. El error es: ${error.error}`)
    }

    return throwError(() => new Error('Ha ocurrido un error'));
  }

  obtenerRandomContact(): Observable<Results> {
    return this.http.get<Results>('https://randomuser.me/api/').pipe(
      retry(2), // Numero de intentos de peticiones
      catchError(this.handlerError) // sacamos error si algo falla
    );
  }

  obtenerRandomContacts(n: number, sexo? : string): Observable<Results> {

    let params: HttpParams = new HttpParams().set("results", n);

    if (sexo) {
      params = params.append("gender", sexo);
    }

    return this.http.get<Results>('https://randomuser.me/api/', {params: params}).pipe(
      retry(2), // Numero de intentos de peticiones
      catchError(this.handlerError) // sacamos error si algo falla
    );

  }

}
