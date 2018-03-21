import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // name: string;
  // user: any
  constructor(public appService: AppService){}
  // user = this.appService.user;
}