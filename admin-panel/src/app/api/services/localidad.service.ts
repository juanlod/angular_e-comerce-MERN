/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { Localidad } from '../models/localidad';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class LocalidadService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveLocality
   */
  static readonly SaveLocalityPath = '/localidades/save_localidad';

  /**
   * Save a locality.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLocality()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private saveLocality$Response(params: {
    body: Localidad
  }): Observable<StrictHttpResponse<Localidad>> {

    const rb = new RequestBuilder(this.rootUrl, LocalidadService.SaveLocalityPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Localidad>;
      })
    );
  }

  /**
   * Save a locality.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveLocality$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLocality(params: {
    body: Localidad
  }): Observable<Localidad> {

    return this.saveLocality$Response(params).pipe(
      map((r: StrictHttpResponse<Localidad>) => r.body as Localidad)
    );
  }

  /**
   * Path part for operation findAllPagingLocalities
   */
  static readonly FindAllPagingLocalitiesPath = '/localidades/get_localidades';

  /**
   * Get all localities.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingLocalities()` instead.
   *
   * This method doesn't expect any request body.
   */
  private  findAllPagingLocalities$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<Localidad>>> {

    const rb = new RequestBuilder(this.rootUrl, LocalidadService.FindAllPagingLocalitiesPath, 'get');
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
        return r as StrictHttpResponse<Array<Localidad>>;
      })
    );
  }

  /**
   * Get all localities.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingLocalities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingLocalities(params: {

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
  }): Observable<Array<Localidad>> {

    return this.findAllPagingLocalities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Localidad>>) => r.body as Array<Localidad>)
    );
  }
}
