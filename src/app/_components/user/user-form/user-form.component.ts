import { UserService } from 'src/app/_services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {  
  userForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, Validators.required],
    password: [null],
    createdDate: [null],
    lastUpdate: null,    
  }); 

  constructor(private fb: FormBuilder, private userService: UserService) {}

  onSubmit() {    
     this.userService.addUser(this.userForm.value);
  }
}
