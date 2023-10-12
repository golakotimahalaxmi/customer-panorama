import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http:HttpClient) { }
  public fetchChatMessage(message:any){
    let obj={
      "Question": message.question
    };
    return this.http.post('https://gugj7x5tgg5ydvr7hm3kw2utr40jszae.lambda-url.ap-south-1.on.aws/',obj,{responseType: 'text'});
  }

}
