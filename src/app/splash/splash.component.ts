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
  public validPassword = "";
  public validUsername = "";
  public selectedValue: string = "";
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
  submit(): void {
    console.log(this.selectedValue);
    if (
      this.validUsername == "" &&
      this.validPassword == "" &&
      this.selectedValue === "Select Industry"
    ) {
      this.displayMessage("Email is Required", "error");
      this.displayMessages("Password is Required", "error");
      this.displayMessages("Option is Required", "error");
    } else if (this.isUserNameInvalid()) {
      this.displayMessage("Invalid Username", "error");
    } else if (this.isPasswordInvalid()) {
      this.displayMessages("Invalid Password", "error");
    } else if (this.isOptionSelected()) {
      this.displayMessage("Invalid Option", "error");
    } else {
      this.getDashboard(this.selectedValue);
    }
  }

  isUserNameInvalid() {
    const UsernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
    return !UsernameRegex.test(this.validUsername);
  }
  isPasswordInvalid() {
    console.log(this.validPassword);
    if (this.validPassword.length>8)
    {
      return true;
    }
    else{
      return false;
    }
  }

  isOptionSelected() {
    if (this.selectedValue === "Select Industry") {
      return false;
    } else {
      return true;
      console.log("false");
    }
    console.log("false");
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
}
// function displayMessage(message: any, string: any, type: any, arg3: number) {
//   throw new Error("Function not implemented.");
// }

