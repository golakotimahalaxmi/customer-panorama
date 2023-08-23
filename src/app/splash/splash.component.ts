import { Component, OnInit, Renderer2 } from "@angular/core";
import { CustomerService } from "src/app/services/customerService";
import { Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboardService";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.component.html",
  styleUrls: ["./splash.component.css"],
})
export class SplashComponent implements OnInit {
  allHeadings: any = {};
  splashTooltip: string =
    "Click here to launch the Customer Mosaic experience for customers in CDW’s Corporate segment";
  small_Biz_Tooltip: string =
    "Click here to launch the Customer Mosaic experience for customers in CDW’s Small Business segment";
  loginForm: FormGroup;

  constructor(
    private service: CustomerService,
    private router: Router,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getAllHeadings();
  }

  changeCustomer(business: string) {
    sessionStorage.clear();
    this.service.setCustomerType(business);
    sessionStorage.setItem("stackHolderName", business);
    this.router.navigate(["/dashboard"]);
  }

  getAllHeadings() {
    this.dashboardService.getAllheadings().subscribe((headings) => {
      this.allHeadings = headings;
      this.dashboardService.subscribeAllheadings(headings);
    });
  }

  getDashboard(selectvalue: string) {
    sessionStorage.clear();
    this.service.setCustomerType(selectvalue);
    sessionStorage.setItem("stackHolderName", selectvalue);
    this.router.navigate(["/dashboard"]);
  }
  //validation
  submit(user:string,pass:string,option:string){
   
   console.log(user)
   console.log(pass)
    console.log(option);
   
    if (
      user.length == 0 &&
      pass.length == 0 &&
      option === "Select Industry"
    ) {
     
      this.displayMessage("username is Required", "error");
      this.displayMessages("Password is Required", "error");
      this.displayOptionMessages("Option is Required", "error");
    }
     else if (user.length === 0 && pass.length==0) {
      this.displayMessage(" Username Required", "error");
      this.displayMessages("Password is Required", "error");
    }
    else if (pass.length === 0 && option==="Select Industry") {
      this.displayMessages("Invalid Password", "error");
      this.displayOptionMessages("Option is Required", "error");
    } 
    else if(user.length === 0 && option==="Select Industry"){
      this.displayMessage("username is Required", "error");
      this.displayOptionMessages("Option is Required", "error");
    }
    else if (option === "Select Industry" ) {
      this.displayOptionMessages("Invalid Option", "error");

    }
    else if (user.length===0)
    {
      this.displayMessage("username is Required", "error");
    }
    else if (pass.length===0)
    {
      this.displayMessages("Password is Required", "error");
    }
    else {
      this.getDashboard(option);
    }
  }

  //username Validation
  displayMessage(message: string, type: "error" | "success") {
    const UsernameElement = this.renderer.createElement("div");
    UsernameElement.textContent = message;
    this.renderer.addClass(UsernameElement, type);

    const messagesContainer = document.getElementById("usernameValidCheck");
    this.renderer.appendChild(messagesContainer, UsernameElement);

    setTimeout(() => {
      this.renderer.removeChild(messagesContainer, UsernameElement);
    }, 3000);
  }
  displayMessages(message: string, type: "error" | "success") {
    //Password Validation
    const passwordmessageElement = this.renderer.createElement("div");
    passwordmessageElement.textContent = message;
    this.renderer.addClass(passwordmessageElement, type);

    const pwdmessagesContainer = document.getElementById("passwordValidCheck");
    this.renderer.appendChild(pwdmessagesContainer, passwordmessageElement);

    setTimeout(() => {
      this.renderer.removeChild(pwdmessagesContainer, passwordmessageElement);
    }, 3000);
  }
  displayOptionMessages(message: string, type: "error" | "success") {
    //Password Validation
    const OptionmessageElement = this.renderer.createElement("div");
    OptionmessageElement.textContent = message;
    this.renderer.addClass(OptionmessageElement, type);

    const pwdmessagesContainer = document.getElementById("optionValidCheck");
    this.renderer.appendChild(pwdmessagesContainer, OptionmessageElement);

    setTimeout(() => {
      this.renderer.removeChild(pwdmessagesContainer, OptionmessageElement);
    }, 3000);
  }
 

}
// function displayMessage(message: any, string: any, type: any, arg3: number) {
//   throw new Error("Function not implemented.");
// }

