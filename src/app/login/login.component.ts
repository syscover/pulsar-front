import { Component,
        OnInit,
        HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ps-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  /*@HostBinding('@fadeInAnimation') get fadeInAnimation(){
     return 'true';
  };*/

  email: string;
  password: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/pulsar/admin']);
  }

}
