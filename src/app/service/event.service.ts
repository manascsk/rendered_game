import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http:HttpClient
  ) { }

  addEvent(data:any){
    let url = 'http://127.0.0.1:8000/event';
    return this.http.post(url,data);
  }
  getEvent(){
    let url = 'http://127.0.0.1:8000/event';
    return this.http.get(url);
  }
  deleteEvent(id:any){
    let url = 'http://127.0.0.1:8000/event/'+id;
    return this.http.delete(url);
  }
}
