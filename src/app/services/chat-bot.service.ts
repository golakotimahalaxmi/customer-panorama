import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor() { }
  public messagesList:any[]=[];
  getMessages()
  {
    return this.messagesList;
  }
  private updateMessageList=new BehaviorSubject<any[]>([]);
  callMessageList=this.updateMessageList.asObservable();

  addToMessageList(Message:string){
    this.messagesList.push(Message);
    this.updateMessageList.next(this.messagesList);
  }

}
