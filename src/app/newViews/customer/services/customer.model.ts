import { stringify } from "@angular/compiler/src/util";

export class Customer {
  Customer_Name: string;
  Customer_Address: string;
  Customer_City: string;
  Customer_State: string;
  Mobile_Number: string;
  Customer_Email_ID: string;
  Loan_Approval_ID: string;
  Bank_Branch_Code: string;
  Bank_Account_Number: string;
  QR_Code_ID: string;
  Enable_Disable_FG: string;
  Account_Verify_TS: string;
  Account_Verify_Status: string;
  Image_Name: string;
  Categories: string;
}

export class id {
  id: string;
}

export class Acountchange {
  row_id: number;
  account_no: string;
  remarks: string;
}

export class Phonechange {
  row_id: number;
  phone_no: string;
  remarks: string;
}

export class vnumber {
  mobile_number: String;
}

export class AuditCustomer {
  PK: number;
  FILEDNAME: string;
  OLDVALUE: string;
  NEWVALUE: string;
  UPDATED_BY: string;
  UPDATED_TS: string;
  USER_REMARKS: string;
}
