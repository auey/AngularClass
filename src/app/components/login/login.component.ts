
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username:string;
  private password:string;
  private result_text:string;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {


  }

  login(username,password){

    this.loginService.login(username,password).subscribe((response) => {
      if(response.success == "true"){ //true ที่เป็นstring ถ้าเท่ากับ true ให้ navigate ไปหน้าhome
          // this.result_text = "passed !";
          this.loginService.setUserLoggedIn();
          this.router.navigate(['home']);
          console.log("Logging in ...");
      }else{
          this.result_text = "incorrect username or password!"; //ถ้าlogin เป็น false
      }
    })
    return false; //ไม่ให้หน้ารีเฟรส
  }

}

interface LoginRespone {
  success: string;
  status: string;
}
