// Models for Billing History API

export interface BillingHistoryRequest {
  StartDate?: string;
  EndDate?: string;
  Paid?: number;
  ServiceType?: string;
  PageSize?: number;
  PageNumber?: number;
}

export interface BillingHistoryItem {
  quotationID: number;
  quotationNo: string;
  itemId: number;
  postedOn: string;
  totalAmount: number;
  paid: number;
  adType: number;
  jType: string | null;
  regionalJob: number;
  serviceId: number | null;
  invoicE_NO: string | null;
  inV_DATE: string | null;
  serviceName: string | null;
  p_IDs: string | null;
  purchaseID: number | null;
  totalCV: number | null;
  smsNumber: number | null;
  rtype: string;
  invoiceId: number | null;
  paidBy: string | null;
  verifiedByAccounts: string | null;
  comments: string | null;
  r: number;
}

export interface BillingHistoryResponse {
  responseType: string;
  dataContext: any;
  responseCode: number;
  requestedData: any;
  data: BillingHistoryItem[];
  totalCount?: number;
} 