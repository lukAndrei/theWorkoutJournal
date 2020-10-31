import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlaskWorkoutsServiceService {
  private url='http://localhost:5000/add-workout';
  private addUserUrl='http://localhost:5000/add-user'
  private validateUserUrl = 'http://localhost:5000/validate-user'
  constructor(private http: HttpClient) { 
    
  }

  getWorkout(){
    return this.http.get(this.url, {observe:'body'})
  }

  addWorkout(workout){
  
    return this.http.post(this.url, JSON.stringify(workout),{ headers: {'Content-Type': 'application/json'}})
    .subscribe(response=>
      {console.log(response)})
  }
  validate_user(userData){
    return this.http.post(this.validateUserUrl, JSON.stringify(userData), {headers: {'Content-Type': 'application/json'}})
  }
  add_user(userData){
    return this.http.post(this.addUserUrl, JSON.stringify(userData), {headers: {'Content-Type': 'application/json'}}).toPromise()
  }
}
