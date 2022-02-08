import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  eventForm: any
  submitted = false;
  allEvent: any
  event = new Array()
  gameList: any
  
  @ViewChild('closeModel')
  closeModel!: ElementRef<HTMLElement>;

  constructor(private eventService: EventService, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      gameName: [null, Validators.required],
      eventName: [null, Validators.required],
      developer: [null, Validators.required],
      platForm: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    })
  }
  ngOnInit() {
    // this is used to get all the from server
    this.eventService.getEvent().subscribe(res => {
      this.allEvent = res;
      this.event = this.allEvent;
      this.gameList = [...new Map(this.allEvent.map((item: any) => [item['game_name'], item])).values()];
    })

  }
  get eventFormError(): any {
    return this.eventForm.controls
  }

  // this method is used to create a new event 
  // if the form is valid the data will store to the server
  addEvent() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    } else {
      this.eventService.addEvent(this.eventForm.value).subscribe(res => {
        this.allEvent = res;
        this.event = this.allEvent;
        this.gameList = [...new Map(this.allEvent.map((item: any) => [item['game_name'], item])).values()];
        let modal = this.closeModel.nativeElement;
        modal.click();
        this.eventForm.reset();
        this.submitted = false;
        Swal.fire({
          icon: 'success',
          title: 'Event Created',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }
  // this method is used to delete event
  // @params id :- id of delete object
  deleteEvent(id: any) {
    this.eventService.deleteEvent(id).subscribe(res => {
      this.allEvent = res;
      this.event = this.allEvent;
      this.gameList = [...new Map(this.allEvent.map((item: any) => [item['game_name'], item])).values()];
      Swal.fire({
        icon: 'success',
        title: 'Event Created',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  // This method is used to filter event
  filterEvent(event: any) {
    console.log(event.target.value);
    if (event.target.value === '') {
      this.event = this.allEvent;
    } else {
      this.event = [];
      this.allEvent.forEach((element: any) => {
        if (element.game_name == event.target.value) {
          this.event.push(element);
        }
      });

    }

  }
}
