import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRandomContact, Results } from 'src/app/models/randomuser';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-random-contact-page',
  templateUrl: './random-contact-page.component.html',
  styleUrls: ['./random-contact-page.component.scss']
})
export class RandomContactPageComponent implements OnInit {

  contact: IRandomContact | undefined;

  constructor(private randomUserService: RandomUserService) { }

  ngOnInit(): void {

    this.randomUserService.obtenerRandomContact().subscribe(
      (response: Results) => {
        this.contact = response.results[0]; // se lo pasamos al RandomContact
        console.log(this.contact);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

  obtenerNuevoContacto() {
    this.randomUserService.obtenerRandomContact().subscribe(
      (response: Results) => {
        this.contact = response.results[0]; // se lo pasamos al RandomContact
        console.log(this.contact);
      },
      (error: HttpErrorResponse) => {
        console.error(`${error}`);
      }
    )

    this.randomUserService.obtenerRandomContact().subscribe(
      {
        next: (response: Results) => {
          this.contact = response.results[0]; // se lo pasamos al RandomContact
        },
        error: (error: HttpErrorResponse) => {
          console.error(`${error}`);
        },
        complete: () => {
          console.log('Peticion de random contact completada');
        }
      }
    );
  }

  obtenerListaContactos(n: number) {
    this.randomUserService.obtenerRandomContacts(n).subscribe(
      {
        next: (response: Results) => {
          console.log(response);
        },
        error: (error) => console.error(`${error}`),
        complete: () => console.log('Peticion de random contact completada')
      }
    );
  }

}
