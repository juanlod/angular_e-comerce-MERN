/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { Cliente } from '../models/cliente';
import { ClienteLogin } from '../models/cliente-login';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class ClienteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveClient
   */
  static readonly SaveClientPath = '/save_client';

  /**
   * Save a client.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClient$Response(params: {
    body: Cliente
  }): Observable<StrictHttpResponse<Cliente>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteService.SaveClientPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Cliente>;
      })
    );
  }

  /**
   * Save a client.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClient(params: {
    body: Cliente
  }): Observable<Cliente> {

    return this.saveClient$Response(params).pipe(
      map((r: StrictHttpResponse<Cliente>) => r.body as Cliente)
    );
  }

  /**
   * Path part for operation loginClient
   */
  static readonly LoginClientPath = '/login_client';

  /**
   * Log in as a client.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginClient$Response(params: {
    body: ClienteLogin
  }): Observable<StrictHttpResponse<{
'token'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteService.LoginClientPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'token'?: string;
        }>;
      })
    );
  }

  /**
   * Log in as a client.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loginClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginClient(params: {
    body: ClienteLogin
  }): Observable<{
'token'?: string;
}> {

    return this.loginClient$Response(params).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
}>) => r.body as {
'token'?: string;
})
    );
  }

  /**
   * Path part for operation findAllPagingClients
   */
  static readonly FindAllPagingClientsPath = '/get_clients';
  /**
   * Get all clients.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingClients()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingClients$Response(params: {

    /**
     * filtro
     */
    filtro: string;

    /**
     * Pagina
     */
    pagina: string;

    /**
     * Estado del cliente
     */
    pageSize: string;
  }): Observable<StrictHttpResponse<Array<Cliente>>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteService.FindAllPagingClientsPath, 'get');
    if (params) {
      rb.query('filtro', params.filtro, {});
      rb.query('pagina', params.pagina, {});
      rb.query('pageSize', params.pageSize, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Cliente>>;
      })
    );
  }

  /**
   * Get all clients.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingClients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingClients(params: {

    /**
     * filtro
     */
    filtro: string;

    /**
     * Pagina
     */
    pagina: string;

    /**
     * Estado del cliente
     */
    pageSize: string;
  }): Observable<Array<Cliente>> {

    return this.findAllPagingClients$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Cliente>>) => r.body as Array<Cliente>)
    );
  }


}
