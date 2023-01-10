import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IRandomContact, Results } from 'src/app/models/randomuser';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.scss']
})
export class RandomUserComponent implements OnInit{

  @Input() randomContact: IRandomContact | undefined;

  constructor() { }

  ngOnInit(): void { }

}
