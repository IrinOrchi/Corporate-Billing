import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../cookies/cookies.service';
import { BillingHistoryRequest, BillingHistoryResponse } from '../../Models/billings/billings';

@Injectable({ providedIn: 'root' })
export class BillingHistoryService {
  private apiUrl = 'https://api.bdjobs.com/Employeer-Billing/api/BillingHistory/GetBillingHistory';

  constructor(private http: HttpClient, private cookieService: CookieService) {}



  private getCompanyIdFromCompanyCookie(): string | null {
    let companyCookie = this.cookieService.getCookie('Company');
   ///for localhost only
    if (!companyCookie) {
      companyCookie = 'LoginToken=f1be76088c60da1cfa281833de3b918f4ac658c840cd92854db15a12320e3f2a&ComUsrAcc=ZRd9PxCu&sCode%2DEmpl=acc34133&ComNo=ZxU0PRC%3D';
    }
   
    if (!companyCookie) return null;
    const pairs = companyCookie.split('&');
    for (const pair of pairs) {
      const [key, ...rest] = pair.split('=');
      const value = rest.join('=');
      if (key === 'ComNo') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  getBillingHistory(params: BillingHistoryRequest): Observable<BillingHistoryResponse> {
    const EncodedCompanyID = this.getCompanyIdFromCompanyCookie();
    if (!EncodedCompanyID) throw new Error('Company ID not found in Company cookie');

    let httpParams = new HttpParams()
      .set('EncodedCompanyID', EncodedCompanyID);

    if (params.StartDate) httpParams = httpParams.set('StartDate', params.StartDate);
    if (params.EndDate) httpParams = httpParams.set('EndDate', params.EndDate);
    if (params.Paid !== undefined) httpParams = httpParams.set('Paid', params.Paid.toString());
    if (params.ServiceType) httpParams = httpParams.set('ServiceType', params.ServiceType);
    if (params.PageSize) httpParams = httpParams.set('PageSize', params.PageSize.toString());
    if (params.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber.toString());

    return this.http.get<BillingHistoryResponse>(this.apiUrl, { params: httpParams });
  }
} 