/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { Provincia } from '../models/provincia';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class ProvinciaService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveProvince
   */
  static readonly SaveProvincePath = '/provincias/save_provincia';

  /**
   * Save a province.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveProvince()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProvince$Response(params: {
    body: Provincia
  }): Observable<StrictHttpResponse<Provincia>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinciaService.SaveProvincePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Provincia>;
      })
    );
  }

  /**
   * Save a province.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveProvince$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProvince(params: {
    body: Provincia
  }): Observable<Provincia> {

    return this.saveProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Provincia>) => r.body as Provincia)
    );
  }

  /**
   * Path part for operation findAllPagingProvince
   */
  static readonly FindAllPagingProvincePath = '/provincias/get_provincias';

  /**
   * Get all provinces.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingProvince()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingProvince$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<Provincia>>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinciaService.FindAllPagingProvincePath, 'get');
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
        return r as StrictHttpResponse<Array<Provincia>>;
      })
    );
  }

  /**
   * Get all provinces.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingProvince$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingProvince(params: {

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
  }): Observable<Array<Provincia>> {

    return this.findAllPagingProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Provincia>>) => r.body as Array<Provincia>)
    );
  }

}
