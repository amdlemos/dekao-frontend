import { OfflineService } from './../../../_services/offline.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public dataSource: User[];
  public userSubscription: Subscription;
  displayedColumns: string[] = ['username', 'email', 'action'];

  constructor(
    private userService: UserService,
    private offlineService: OfflineService,
    private router: Router,
    public dialog: MatDialog, ) {

  }

  async getUsers() {
    this.dataSource = await this.userService.getAll();
  }


  delete(userId: string) {
    return this.userService.deleteUser(userId);
    //refetch the data from mongo
    //await this.getUsers();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log("Checks whether the user confirmed the deletion:", result.event);

      if (result.event == 'Excluir') {
        this.delete(result.data._id).subscribe(res => {          
          if (res.n === 1) {
            this.dataSource = this.deleteRowData(result.data);
          }
        });
      }
    });
  }

  // addRowData(row_obj) {
  //   var d = new Date();
  //   this.dataSource.push({
  //     id: d.getTime(),
  //     name: row_obj.name
  //   });
  //   this.dataSource.renderRows();

  // }
  // updateRowData(row_obj) {
  //   this.dataSource = this.dataSource.filter((value, key) => {
  //     if (value.id == row_obj.id) {
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }

  deleteRowData(row_obj) {   
    console.log('row_obj', row_obj)
    return this.dataSource = this.dataSource.filter((value, key) => {
      
      return value._id != row_obj._id;
    });
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
