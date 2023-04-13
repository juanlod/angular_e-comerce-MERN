/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Admin } from '../models/admin';
import { AdminLogin } from '../models/admin-login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveAdministrator
   */
  static readonly SaveAdministratorPath = '/save_admin';

  /**
   * Register a new admin.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAdministrator()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAdministrator$Response(params: {
    body: Admin
  }): Observable<StrictHttpResponse<Admin>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.SaveAdministratorPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Admin>;
      })
    );
  }

  /**
   * Register a new admin.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveAdministrator$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAdministrator(params: {
    body: Admin
  }): Observable<Admin> {

    return this.saveAdministrator$Response(params).pipe(
      map((r: StrictHttpResponse<Admin>) => r.body as Admin)
    );
  }

  /**
   * Path part for operation loginAdmin
   */
  static readonly LoginAdminPath = '/login_admin';

  /**
   * Admin login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginAdmin$Response(params: {
    body: AdminLogin
  }): Observable<StrictHttpResponse<Token>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.LoginAdminPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Token>;
      })
    );
  }

  /**
   * Admin login.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loginAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginAdmin(params: {
    body: AdminLogin
  }): Observable<Token> {

    return this.loginAdmin$Response(params).pipe(
      map((r: StrictHttpResponse<Token>) => r.body as Token)
    );
  }

}
