import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chatInput = new FormControl();
  receiver = new BroadcastChannel("tester")
  sender = new BroadcastChannel("tester")
  messages:string[] = [];
sessionStorage: any;
  constructor(private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    // this.sender.onmessage = ({data}) => console.log("Irecive msgs form tabs EXCEPT the sender tab", data)
    this.receiver.onmessage = ({data}) =>{ this.messages.push(data),
      console.log(data,this.messages)
      this.cdr.detectChanges()
    }
  }
  saveSession(sessionNumber:number){
    sessionStorage.setItem("session",JSON.stringify(sessionNumber))
  }
  onSubmit(){
    this.sender.postMessage(this.chatInput.value)
  }
}
