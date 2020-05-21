import { AuthService } from 'src/app/_services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  
  userForm = this.fb.group({
    username: [null, Validators.required],   
    password: [null],
   
  }); 

  constructor(private fb: FormBuilder, private _authService: AuthService) {}

  onSubmit() {    
       this._authService.login(this.userForm.value);
  }
}
