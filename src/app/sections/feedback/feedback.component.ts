import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Viewcomments, Savefeedback } from 'src/app/classesList/customer';
import { CustomerSimilarComponent } from '../customer-similar/customer-similar.component';
import { CustomerService } from 'src/app/services/customerService';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  commentingForm: FormGroup;
  commentsList: Viewcomments[] = [];
  constructor(private fb: FormBuilder, private service: CustomerService) { 
   
  }

  ngOnInit() {
    this.intialReprtingform();
    this.getCommentsData();
  }

  // method for creating the form
  intialReprtingform() {
    this.commentingForm = this.fb.group({
       Title: ['', [Validators.required]],
       Content: ['', [Validators.required]],
       CreatedON: [''],
       CreatedBY: [''],
       show: [false]
    });
  }

  // method for getting the comments from server
  getCommentsData() {
    this.commentsList.length = 0;
    let commentsData = sessionStorage.getItem('comments');
    if(commentsData != null) {
      this.commentsList = JSON.parse(commentsData);
    } else {
      this.service.getFeedback().subscribe(response => {
        response.forEach(val => {
          val.show = false;
          this.commentsList.push(val);
        })
        sessionStorage.setItem('comments', JSON.stringify(this.commentsList));
       })
    }
  }

  // method for submitting the form
  submitComment() {
    let obj = new Savefeedback();
    obj.content = this.commentingForm.controls['Content'].value;
    obj.title = this.commentingForm.controls['Title'].value;
    this.service.setFeedback(obj).subscribe(response => {
      
    })
    this.commentsList.push(this.commentingForm.value);
    sessionStorage.setItem('comments', JSON.stringify(this.commentsList));
    this.commentingForm.reset();
    this.getCommentsData();
  }

  // method for increses the dynamic height of text-area
  resizeText() {
    let val = document.getElementsByTagName('textarea');
    for(let i=0; i< val.length; i++) {
      val[i].setAttribute('style', 'height:' + (val[i].scrollHeight) + 'px;overflow-y:hidden;');
    }
  }

  show(index: number, show: boolean) {
     if(show === false) {
          this.commentsList.forEach((val, indexVal) => {
            if(indexVal === index) {
              val.show = true;
            }
          });
     } else {
          this.commentsList.forEach((val, indexVal) => {
            if(indexVal === index) {
              val.show = false;
            }
          });
     }
     
  }

 
 
}
