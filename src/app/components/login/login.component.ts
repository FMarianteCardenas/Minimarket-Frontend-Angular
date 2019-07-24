import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup,FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
  constructor(private auth:AuthService, private _router:Router) {
    this.loginForm = new FormGroup({
      'email':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required)
    });
  }

  ngOnInit() {
    if(this.auth.isLogued()){
      this._router.navigate(['caja']);
    }
  }

  login(){
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    if(email && password){
      let body = this.auth.loginBody(email,password);
      this.auth.login(body).subscribe((response:any)=>{
        console.log("Response Login: ",response);
        this.auth.setSession(response);
        this._router.navigate(['caja']);
      },(error)=>{
        console.log("ERROR: ",error);
      })
    }
  }

}
