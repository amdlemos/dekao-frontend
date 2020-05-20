import { OfflineService } from './../../../_services/offline.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: any;
  public userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private offlineService: OfflineService,
    private router: Router) {

  }

  async getUsers() {
     this.users = await this.userService.getAllUsers();   
  }

  delete(userId: string) {
    this.userService.deleteUser(userId)
    //refetch the data from mongo
    this.getUsers();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy() {
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe()
    }
  }

}
