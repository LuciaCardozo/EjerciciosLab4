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
  listaDeCorreos: any = [];
  user = {
    email: '',
    password: '',
  };
  constructor(private database: AuthFireService, private route: Router, private toastService:ToastService) { }

  async ngOnInit() {
    const res = await this.database.traerTodo('users');
    res?.subscribe((listaref: any) => {
      this.listaDeCorreos = listaref.map((userRef: any) => userRef.payload.doc.data());
    });
  }

  loginWithValidation() {
    let existe = this.listaDeCorreos.find((email: any) => email.email == this.user.email && email.password == this.user.password);
    if (existe) {
      try{
          this.database.onLogin(this.user.email, this.user.password).then((res)=>{
            if(res) {
              this.database.emailUsuarioLogeado = this.user.email;   
              console.log(res)
              this.route.navigate(['/home']);
              this.toastService.show("Successfully user.", {classname:'bg-success', "delay":"2000"});
            }
        });
      }catch(error){
        this.toastService.show("Error login.", {classname:'bg-warning', "delay":"2000"});
      }
    }else if(this.user.email == '' || this.user.password==''){
      this.toastService.show("Please complete all fields.", {classname:'bg-warning', "delay":"2000"});
    }else{
      this.toastService.show("The user or password is incorrect.", {classname:'bg-danger', "delay":"2000"});
    }
  }
  
  userAutocomplete(email:string,password:string) {
    this.user.email = email;
    this.user.password = password;
  }


}
