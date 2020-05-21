import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {    
  userForm: FormGroup;
  private returnUrl: string;
  
  constructor(
    private fb: FormBuilder, 
    private _authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) {}

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.userForm = this.fb.group({
      username: ['', Validators.required],   
      password: [''],
     
    }); 

    if (await this._authService.isLoggedIn()) {
      await this.router.navigate(['/users']);
    }
  }


  onSubmit() {    
       this._authService.login(this.userForm.value);
  }
}
