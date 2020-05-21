import { User } from '../_models/user.model';
import { Injectable } from '@angular/core';
import { OfflineService } from './offline.service';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute, Route } from "@angular/router";
import { Observable, of } from 'rxjs';
import { DekaoDatabase } from '../dexie/dekaoDb';

const API = 'http://localhost:4040/';

@Injectable()
export class UserService {
  items: User[];
  itensToInsert: User[];

  lastMongodbUser: User;
  lastIndexedDbUser: User;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private readonly offlineService: OfflineService,
    private dekaoDb: DekaoDatabase,
    private httpClient: HttpClient,
    private router: Router) {

    this.registerToEvents(offlineService);
    this.listenToEvents(offlineService);
  }

  // ---------- get all users from the indexedDb
  async getAllUsers() {

    this.lastIndexedDbUser = await this.getLastAddedUserFromIndexedDB();    
    this.itensToInsert = await this.getUsersToUpdateIndexedDb();
    

    if (this.itensToInsert.length > 0) {      
      await this.insertUsersOnIndexedDB(this.itensToInsert);
    }

    return await this.getAllUsersFromIndexedDb();
  }

  // ----------- get all users from indexedDb
  async getAllUsersFromIndexedDb(): Promise<User[]> {
    console.log('Get all users from IndexedDb')
    return await this.dekaoDb.users.toArray();
  }

  // ---------- get users to update indexdedDb
  async getUsersToUpdateIndexedDb(): Promise<User[]> {
    console.log('Get users from MongoDb to update IndexedDb')
    //Create new HttpParams
    let params = new HttpParams()
      .set("lastUpdate", this.lastIndexedDbUser.lastUpdate.toString());

    return await this.httpClient.get<User[]>(`${API}userssync/${this.lastIndexedDbUser.lastUpdate}`)
      .toPromise()
      .then(users => {
        return users;
      });
  }

  // ----------- popula o indexedDB 
  async insertUsersOnIndexedDB(users: User[]) {
    console.log('Insert users to IndexdDB');
    await users.forEach(item => this.addToIndexedDb(item))
  }
  
  // ----------- obtem ultimo usuário adicionado ao indexedDB
  async getLastAddedUserFromIndexedDB(): Promise<User> {
    console.log('Get the last user added to the IndexedDb')
    return await this.dekaoDb.users.orderBy('lastUpdate').reverse().first();
  }

  // TODO: necessário criar método para editar itens no indexedDb
  // ---------- add user to the indexedDB on offline mode  
  private async addToIndexedDb(user: User) {  
    let newUser = new User(
      user._id,
      user.username,
      user.email,
      user.password,
      user.lastUpdate);

    console.log('new user', newUser);
    this.dekaoDb.users.add(newUser)
      .then(async () => {
        const allItems: any[] = await this.dekaoDb["users"].toArray();
        //console.log('saved in DB, DB is now', allItems);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  private registerToEvents(offlineService: OfflineService) {

    offlineService.connectionChanged.subscribe(online => {

      console.log(online);
      if (online) {
        console.log('went online');
        console.log('sending all stored items');

        // TODO: AQUI EU DEVO VERIFICAR SE OUVE ALTERAÇÃO NO BANCO ENQUANTO
        // O USUÁRIO FICOU OFFLINE                
      } else {
        console.log('went offline, storing in indexdb');
      }
    });

  }

  private listenToEvents(offlineService: OfflineService) {

    offlineService.connectionChanged.subscribe(online => {

      console.log(online);
      if (online) {
        console.log('went online');
        console.log('sending all stored item ids');

        //send _ids for bulk delete
        //this.sendItemsToDelete();

      } else {
        console.log('went offline, storing ids to delete later, in indexdb');
        console.log('Não é possível excluir usuários quando se está offline.');
      }
    });

  }

  // ---------- add the users
  addUser(user: User) {
    //add the "done" property
    user["done"] = false;

    // save into the indexedDB if the connection is lost
    if (!this.offlineService.isOnline) {
      console.log('Não é possível adicionar usuários quando se está offline.')
    } else {
      //post request to mongodb
      this.postUser(user).subscribe(res => {
        this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      });
    }
  }

  // ---------- delete user
  deleteUser(userId: string) {
    let user = {
      _id: userId
    }

    if (!this.offlineService.isOnline) {

      console.log('Não é possível excluir usuários quando se está offline.');
      // se fosse possível fariamos como o método abaixo.
      //this.addToDeleteDatabase(user);
    } else {

      this.removeUser(user).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      })

    }
  }

  // ---------- post an user from the database
  postUser(itemObj: object) {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    
    let obj = {
      username: itemObj["username"],
      email: itemObj["email"],
      password: itemObj["password"],
      done: false
    }

    console.log("User to post", JSON.stringify(obj));
    //post an item
    return this.httpClient.post(`${API}users`, JSON.stringify(obj), { headers: headers });
  }

  // ---------- delete an users from the database
  removeUser(user: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.httpClient.request("delete",
      `${API}users/` + user["_id"],
      {
        headers: headers,
        body: JSON.stringify(user)

      })
  }





  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }

  // ---------- add to delete database if offline
  // private async addToDeleteDatabase(user: any) {
  //   this.donedb.users.add(user)
  //     .then(async () => {

  //       const allItems: any[] = await this.donedb["users"].toArray();
  //       console.log('saved in DB, DB is now', allItems);

  //     })
  //     .catch(e => {
  //       alert('Error: ' + (e.stack || e));
  //     });
  // }

  //  ---------- send the users to the backend to be deleted
  // private async sendItemsToDelete() {
  //   console.log("sending items for bulk delete");
  //   const allItems: any[] = await this.donedb.users.toArray();

  //   this.bulkDelete(allItems).subscribe(res => {
  //     console.log(res);
  //     this.donedb.users.clear();
  //   });

  // }

  // TODO: Esse método só será implementado nos pedidos.
  //  ---------- send the users to the backend to be added inside the database
  // private async sendItemsFromIndexedDb() {    
  //   console.log("sending items");

  //   const allItems: any[] = await this.dekaoDb.users.toArray();
  //   //bulk update to mongodb
  //   this.bulkUser(allItems).subscribe(res => {
  //     console.log(res);
  //     this.dekaoDb.users.clear();
  //   })
  // }

  //---------- database for users to be deleted
  // private createDoneUsersDatabase() {

  //   this.donedb = new Dexie("DoneUserDatabase");
  //   this.donedb.version(1).stores({
  //     users: "_id"
  //   });
  //   this.donedb.open().catch(function (err) {
  //     console.error(err.stack || err);
  //   });

  // }

  // public bulkUser(users: any) {

  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json');

  //   //post an item
  //   return this.httpClient.post("http://localhost:3000/users/bulk", JSON.stringify(users), { headers: headers });
  // }


  // public bulkDelete(users: any) {
  //   console.log("sending for bulk delete", users);

  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json');

  //   return this.httpClient.request("delete",
  //     "http://localhost:3000/users/bulkDelete/",
  //     {
  //       headers: headers,
  //       body: JSON.stringify(users)

  //     })

  // }

}
