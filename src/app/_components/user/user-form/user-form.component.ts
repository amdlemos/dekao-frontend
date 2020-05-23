import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

  form: FormGroup;

  private subscription: Subscription;
  private userId: string;
  private isNew: boolean = true;
  private title: string;



  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private route: ActivatedRoute, ) {
    this.form = this.fb.group({
      _id:[null],
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null],
      createdDate: [{value: null, disabled: true}],
      lastUpdate: [{value: null, disabled: true}],
    });

  }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        // Verifica se é inclusão ou edição  
        this.userId = params['id'];
        console.log("entrou no subscription", this.userId)
        if (this.userId != null) {
          this.isNew = false;
          this._userService.getById(this.userId).subscribe(data => {
            console.log("retorno do bet",data)
              this.form.patchValue({
                _id: data._id,
                username: data.username,
                email: data.email,
                lastUpdate: moment(data.lastUpdate).locale('pt-br').format('L'),
                createdDate: moment(data.createdDate).locale('pt-br').format('L') ,
                password: ""
              })
              
            });
          this.title = 'Editar';
        } else {
          this.isNew = true;
          this.title = 'Novo';
          //this.user = new User();
        }



      })
  }

  onSubmit() {
    const userForm = this.form;
    let result;
    
    if (this.isNew)
      result = this._userService.add(userForm.value);
    else
      result = this._userService.edit(userForm.value);
  }

  initForm() {

  }
}
