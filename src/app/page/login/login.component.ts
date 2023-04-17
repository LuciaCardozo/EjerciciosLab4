import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFireService } from 'src/app/services/firebaseService/auth-fire.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  constructor(private database: AuthFireService, private route: Router, private toastService:ToastService) { }

  ngOnInit(): void {
  }

  loginWithValidation() {
    if (this.user.email != '' || this.user.password != '') {
      try{
          this.database.onLogin(this.user.email, this.user.password).then((res)=>{
            if(res) {
              this.database.emailUsuarioLogeado = this.user.email;   
              console.log(res)
              this.route.navigate(['/home']);
              this.toastService.show("Successfully user.", {classname:'bg-success', "delay":"2000"});
            }
        }).catch((err)=>{ this.toastService.show("The user or password is incorrect.", {classname:'bg-danger', "delay":"2000"}); });
      }catch(error){
        this.toastService.show("Error login.", {classname:'bg-warning', "delay":"2000"});
      }
    }else{
      this.toastService.show("Please complete all fields.", {classname:'bg-warning', "delay":"2000"});
    }
  }
  
  userAutocomplete(email:string,password:string) {
    this.user.email = email;
    this.user.password = password;
  }


}
