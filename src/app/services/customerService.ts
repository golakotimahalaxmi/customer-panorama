import { Injectable, PipeTransform } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { DecimalPipe } from "@angular/common";
import { environment } from "../../environments/environment";
import {
  MycustomersDetails,
  Customerevents,
  Customernewsalerts,
  Partnerslist,
  Customercontacts,
  Firmographics,
  Contactinfluence,
  Customerfinanical,
  Conversion,
  Recommandation,
  SimilarCompany,
  AccountManager_locations,
  Savefeedback,
  Viewcomments,
} from "../classesList/customer";
import { SortDirection } from "../directives/sortable.directive";

//const Url = environment.api_url;

interface SearchResult {
  customers: MycustomersDetails[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

@Injectable({ providedIn: "root" })
export class CustomerService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  _customers$ = new BehaviorSubject<MycustomersDetails[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private customerFullDetails: MycustomersDetails[] = [];
  singleCustomerDetails: MycustomersDetails;
  private headers = new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  });
  customerType: string;
  selectedGroupofCustomer: string;
  existedCustomerCode: string;

  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this.showParticularStackholderData();
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._customers$.next(result.customers);
        this._total$.next(result.total);
      });
    this._search$.next();
  }

  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let customers = this.sort(
      this.customerFullDetails,
      sortColumn,
      sortDirection
    );

    // 2. filter
    customers = customers.filter((customersDetail) =>
      this.searchingItems(customersDetail, searchTerm)
    );
    const total = customers.length;

    // 3. paginate
    customers = customers.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ customers, total });
  }

  // method for save customer details in services to passing various components
  saveCustomerDetails(value: MycustomersDetails[]) {
    this.customerFullDetails = value;
    this.sort(value, "customer_name", "asc");
  }

  get customers$() {
    this._customers$.next(this.customerFullDetails);
    return this._customers$.asObservable();
  }

  // method for comparing the values in MycustomerDetails based on search
  compare(v1: any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // method for using to filter the customerDetails based on values in serach
  searchingItems(customersDetail: MycustomersDetails, term: string) {
    let value = customersDetail.invoiceDate.split("/");
    let accountCreated = customersDetail.createdDate.split("/");
    return customersDetail.customer_name
      .toLowerCase()
      .includes(term.toLowerCase());
    //  || customersDetail.customer_industry.toLowerCase().includes(term.toLowerCase())
    //  || customersDetail.expenditurePotential.toLowerCase().includes(term.toLowerCase())
    //  || customersDetail.capturedPercentage.toLowerCase().includes(term)
    //  || customersDetail.customer_industry.toLowerCase().includes(term)
    //  || customersDetail.invoiceDate.toLowerCase().includes(term)
    //  || customersDetail.createdDate.toLowerCase().includes(term)
    //  || value[0].toLowerCase().includes(term)
    //  || value[1].toLowerCase().includes(term)
    //  || value[2].toLowerCase().includes(term)
    //  || accountCreated[0].toLowerCase().includes(term)
    //  || accountCreated[1].toLowerCase().includes(term)
    //  || accountCreated[2].toLowerCase().includes(term)
  }

  // method for sort the values of MycustomerDetails by clicking the keys in th
  sort(
    customers: MycustomersDetails[],
    column: string,
    direction: string
  ): MycustomersDetails[] {
    if (direction === "") {
      return customers;
    } else {
      return [...customers].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === "asc" ? res : -res;
      });
    }
  }

  // method for display particular stakeholder data
  showParticularStackholderData() {
    let stackHolder = sessionStorage.getItem("stackHolderName");

    if (stackHolder != null) {
      this.setCustomerType(stackHolder);
    } else {
      this.setCustomerType(this.customerType);
    }
  }

  // method for getting the myCustomers list from services by using http
  getMycustomersList(): Observable<MycustomersDetails[]> {
    return this.http.get<MycustomersDetails[]>(
      "assets/data/" + this.customerType + "/customers_List.json"
    );
  }

  // method for getting the customer events list from services by using http
  getAllCustomerEvents(): Observable<Customerevents[]> {
    return this.http.get<Customerevents[]>(
      "assets/data/" + this.customerType + "/events_list.json"
    );
  }

  // method for getting the customer alerts from services by using http
  getAllCustomernewsalerts(): Observable<Customernewsalerts[]> {
    return this.http.get<Customernewsalerts[]>(
      "assets/data/" + this.customerType + "/new_alerts.json"
    );
  }

  // method for getting partners list for all customers
  getAllpartnerslist(): Observable<Partnerslist[]> {
    return this.http.get<Partnerslist[]>(
      "assets/data/" + this.customerType + "/partners.json"
    );
  }

  // method for getting semiliar company list list for all customers
  getAllsimilarCompanieslist(): Observable<SimilarCompany[]> {
    return this.http.get<SimilarCompany[]>(
      "assets/data/" + this.customerType + "/customer_similar.json"
    );
  }

  // method for getting all customer contacts
  getAllcustomercontacts(): Observable<Customercontacts[]> {
    return this.http.get<Customercontacts[]>(
      "assets/data/" + this.customerType + "/contacts.json"
    );
  }

  // method for getting all firmagraphics
  getAllfirmographics(): Observable<Firmographics[]> {
    return this.http.get<Firmographics[]>(
      "assets/data/" + this.customerType + "/firmographics.json"
    );
  }

  // method for getting all firmagraphics
  getInsights(): Observable<any> {
    return this.http.get<any>(
      "assets/data/" + this.customerType + "/insights.json"
    );
  }

  // method for getting all contant influences
  contactInfluence(): Observable<Contactinfluence[]> {
    return this.http.get<Contactinfluence[]>(
      "assets/data/" + this.customerType + "/conacts_influencers.json"
    );
  }

  storeCustomerCode(customerCode: string) {
    this.existedCustomerCode = customerCode;
  }

  // method for changing the customer data when we click on search
  private customerChangedData: BehaviorSubject<string> = new BehaviorSubject(
    ""
  );
  sendedData = this.customerChangedData.asObservable();
  changeDataBasedOnId(variable: string) {
    this.customerChangedData.next(variable);
  }

  // method for getting finanical data for customer in identity component
  getFinanicalData(): Observable<Customerfinanical[]> {
    return this.http.get<Customerfinanical[]>(
      "assets/data/" + this.customerType + "/customer_financials.json"
    );
  }

  findFundingJson(): Observable<Customernewsalerts[]> {
    return this.http.get<Customernewsalerts[]>(
      "assets/data/" + this.customerType + "/funding.json"
    );
  }

  // method for fecting service data of conversion probability
  getConversionData(): Observable<Conversion[]> {
    return this.http.get<Conversion[]>(
      "assets/data/" + this.customerType + "/customer_conversion.json"
    );
  }

  sendGroupName(variable: string) {
    this.selectedGroupofCustomer = variable;
  }

  setCustomerType(business: string) {   
    this.customerType = business;
  }

  getCustomerType() {
    return this.customerType;
  }

  // method for getAllrecommendations
  getRecommandation(): Observable<Recommandation[]> {
    return this.http.get<Recommandation[]>(
      "assets/data/" + this.customerType + "/recommendations.json"
    );
  }

  // method for getting finanical data for customer in identity component
  getAccountManager_locations(): Observable<AccountManager_locations[]> {
    return this.http.get<AccountManager_locations[]>(
      "assets/data/" + this.customerType + "/international_managers.json"
    );
  }

  setFeedback(feedback): Observable<Savefeedback> {
    return this.http.post<Savefeedback>(
      "http://cprofile.corp.cdw.com:8182/setFeedback",
      feedback
    );
  }

  getFeedback(): Observable<Viewcomments[]> {
    return this.http.get<Viewcomments[]>(
      "http://cprofile.corp.cdw.com:8182/getFeedback"
    );
  }
}
