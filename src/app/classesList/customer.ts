import { NumberSymbol } from "@angular/common";

export interface Mycustomer {
  id: number;
  name: string;
  flag: string;
  area: string;
  population: string;
  invoiceData: string;
  potential: string;
}




// creating the interface for customer list for myCustomers

export class MycustomersDetails {
  customer_name: string;
  CustomerCode: number;
  customer_id: number;
  customer_website_url: string;
  LinkedParentCustomerDescription: string;
  customer_created_by: number;
  customer_created_date: number;
  customer_last_invoice_date: number;
  LifeCycle_Stage: string;
  customer_segment: string;
  customer_last_updated_by: string;
  customer_last_updated_date: string;
  customer_industry: string;
  customer_employee_count_range: string;
  C12TM: any;
  P12Tm: any;
  PP12TM: any;
  C12TMProgress: number;
  P12TmProgress: number;
  PP12TMProgress: number;
  it_expenditure_potential: number;
  expenditure_captured: number;
  customer_employee_count: string;
  customer_employee_count_reliability_code: string;
  customer_ispublic: string;
  FortuneIndicator: string;
  FortuneRank: string;
  CoworkerCode: string;
  createdDate: string;
  invoiceDate: string;
  expenditurePotential: string;
  capturedPercentage: string;
  Online_c12: string;
  Core_c12tm: string;
  vv2_c12tm: number;
  Secondary_Account_Manager: string;
  CustomerAtRiskDescription: string;
  CoworkerName: string;
  CustomerSeq: number;
  DUNSNumber: number;
  Sales_manager: string;
  SecondaryAccountManagerSeq: number;
  customer_code: number;
  CustomerDescription: string;
  sales_goals: number;
  sales_actuals: number;
  totalMTD: string;
  totalYTD: any;
  totalYTDvalue: any;
  totalMTDgross: string;
  totalYTDgross: string;
  margin: number;
  customerC12: any;
  avgspend: any;
  sow: number;
  yoy: number;
  goals_last: number;
  actuals_last: number;
  Core_P12TM: number;
  VV2_P12TM: number;
  Online_p12: number;
  Order_Frequency_In_Days: number;
  avg_sales: number;
  headquarters: string;
  tenure: number;
  conversion_rate: string;
  outbound_calls: number;
  inbound_calls: number;
  outbound_emails: number;
  inbound_emails: number;
  totalCalls: number;
  totalemails: number;
  callsPercent: number;
  emailsPercent: number;

}

export class Customerevents {
  customer_name: string;
  dateTimePub: any;
  title: string;
  url: string;
  source_uri: string;
  event_dataType: string;
  event_date: any;
  event_location: string;
  event_date_time: any;
  description: string;
  customerMeetings: string;
}


// interface for customer news-alert

export class Customernewsalerts {
  customer_name: string;
  customer_code: number;
  customer_id: number;
  title: string;
  author: string;
  posted_on: any;
  posted_date: string;
  posted_on_trust_code: any;
  url: string;
  created_at: string;
  Logo_Name: string;
  source: string;
}

// class for partners list

export class Partnerslist {
  CustomerCode: number;
  CustomerShortDescription: string;
  BrandDescription: string;
  Gross_Sales: number;
}

// class for customer contacts

export class Customercontacts {
  CustomerCode: number;
  CustomerDescription: string;
  contact_name: string;
  contact_location: string;
  contactDetailName: string;
  ContactActualTitle: string;
  ContactPhone: string;
  contact_extn: string;
  ContactFax: string;
  ContactCellPhone: string;
  ContactHomePhone: string;
  EMailAddress: string;
  ContactCreatedDateSeq: number;
  CDWCreatedDateTime: any;
  contact_last_updated_date: any;
  MarketingContactSeq: number;
  PhoneNumberCode: number;
  EmailAddressCode: number;
  ContactLastInvoiceDateSeq: string;
  ContactLastOrderDateSeq: number;
  ContactLastQuoteDateSeq: any;
  contact_do_not_email: number;
  email_interaction: string;
  online_activity: string;
  cdw_spend: string;
  cdw_spend_percent: string;
  nps: number;
  T12M: number;
  LinkedIn: string;
  average_order_value: number;
  average_order_frequency: number;
  influencer: number;
  facebook: string;
  twitter: string;
  instagram: string;
  contact_image: string;
  cdw_spend_image: string;
  inbound_calls: number;
  inbound_emails: number;
  outbound_calls: number;
  outbound_emails: number;
  opened_emails: number;
  pm_inbound_calls: number;
  pm_inbound_emails: number;
  pm_outbound_calls: number;
  pm_outbound_emails: number;
  pm_opened_emails: number;
  total_calls: number;
  total_emails: number;
  callsPercent: number;
  emailsPercent: number;
  compareInboundcalls: number;
  comapreOutboundcalls: number;
  compareInboundemails: number;
  comapreOutboundemails: number;
  customerT12M: number;

}

// class for firmographics

export class Firmographics {
  customer_name: string;
  customer_code: number;
  customer_id: number;
  customer_website_url: string;
  LinkedParentCustomerDescription: string;
  customer_created_by: number;
  customer_created_date: any;
  customer_last_invoice_date: any;
  LifeCycle_Stage: string;
  customer_segment: string;
  customer_last_updated_by: string;
  customer_last_updated_date: any;
  customer_industry: string;
  customer_employee_count_range: string;
  it_expenditure_potential: number;
  expenditure_captured: number;
  customer_employee_count: number;
  customer_employee_count_reliability_code: number;
  customer_ispublic: string;
  FortuneIndicator: string;
  FortuneRank: string;
  CoworkerCode: string;
  CustomerAtRiskDescription: string;
  Logo: string;
  Logo_Name: string;
  Description: string;
  Domain: string;
  Facebook_url: string;
  Twitter_url: string;
  Linkedin_url: string;
  Categories: string;
  Funding_Rounds: number;
  Total_Funding_Amount: string;
  Contact_Email: string;
  Phone: number;
  Type_Of_Funding: string;
  Funding_Announced_On: any;
  Money_Raised: string;
  Street_1: string;
  Street_2: string;
  Postal_Code: number;
  City: string;
  Region: string;
  country: any;
  top_competitors_existing: string;
  top_competitors_prospects: string;
  country_logo: any;
  headquarters: string;
  country_name: string[];
  country_image: string[];

}

// classes for similar companys

export class SimilarCompany {
  CustomerCode: number;
  CustomerName: string;
  SimilarCompany1_Code: number;
  SimilarCompany1_Name: string;
  SimilarCompany2_Code: number;
  SimilarCompany2_Name: string;
  SimilarCompany3_Code: number;
  SimilarCompany3_Name: string;
}


//class for account managers of different location
export class AccountManager_locations {
  customer_code: number;
  location: string;
  contact_location: string;
  primary_account_manager: string;
  primary_accountManager_code: number;
  secondary_account_manager: string;
  secondary_accountManager_Code: number;
  sales_manager: string;
  sales_manager_code: number;
  outbound_calls: number;
  inbound_calls: number;
  outbound_emails: number;
  inbound_emails: number;
  totalCalls: number;
  totalemails: number;
  callsPercent: number;
  emailsPercent: number;
  primary_am_state: string;
  primary_am_country: string;
  secondary_am_state: string;
  secondary_am_country: string;
}

// classes for contant influences

export class Contactinfluence {
  customer_name: string;
  customer_code: number;
  customer_id: number;
  Job_Role: string;
  Is_Current: string;
  Job_Type: string;
  First_Name: string;
  Last_Name: string;
  Bio: string;
  Profile_Image: string;
  Linkedin_url: string;
  fullName: string;
  phone: string;
  email: string;
}

// classes for finanical 

export class Customerfinanical {
  CustomerCode: number;
  CustomerDescription: string;
  PeriodType: string;
  ItemTypeDescription: string;
  BrandDescription: string;
  GrossSales: number;
  CoworkerCode: string;
  GrossSalesTotal: number;
}

// classes for headings
export class Headings {
  myAccount: string;
  newsAlerts: string;
  funding: string;
  customerEvents: string;
  customerIdentity: string;
  customerContacts: string;
  recommendations: string;
  customerTopSpend: string;
  preferredPartnerProducts: string;
  searchPlaceholder: string;
  myAccountsid: string;
  newAlertId: string;
  fundingId: string;
  customerEventsId: string;
  customerIdentityid: string;
  recommendationsId: string;
  customerSimilarId: string;
  customerContactsId: string;
  contactBuyers: string;
  contactInfluencers: string;
  customerTopspend: string;
  customerSpendId: string;
  placeholderInsideModal: string;
  tip_add2Calender: string;
  tip_tfa: string;
  tip_sctotal: string;
  tip_pgm: string;
  tip_ytd: string;
  tip_mtd: string;
  tip_goal_month: string;
  tip_goal_year: string;
  tip_yoy: string;
  tip_splash_corporate_button: string;
  tip_home_leftnav_cdw: string;
}


// classes for conversion probability

export class Conversion {
  conversion_probability: number;
  shopping_carts: number;
  product_group: string;
  sc_total: number;
}

//class for preffered_partners
export class preferredPartnerProducts {
  CustomerCode: any;
  CustomerDescription: string;
  category: string;
  PeriodType: string;
  item_type: string;
  item_class: string;
  partner: string;
  pgm: string;
  spend: any;
}

// classes for recommandation

export class Recommandation {
  probability: number;
  total_value: number;
  sale_type: string;
  product: Product[] = [];
  CustomerCode: number;
  CustomerDescription: string;
  item_type: string;
  item_class: string;
  pgm: string;
  product_name: string;
  product_value: string;
  product_image: string;
  reasons: [];
  contacts: []
}

export class Product {
  product_name: string;
  product_value: number;
  product_image: string;
}

export class widget {
  name: string;
  isFull: boolean;
  size: number = 1;
  widget2: string;
}

export class ManagersList {
  location: string;
  designation: string;
  managerName: string;
  managerCode: number;
  customer_code: number;
}

// classes for feedback form

export class Viewcomments {
  FeedbackID: number;
  Title: string;
  Content: string;
  CreatedON: any
  CreatedBY: string;
  show: boolean;
}

export class Savefeedback {
  title: string;
  content: string;
}