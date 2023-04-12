import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class LocalidadService {
  private API_URL = environment.apiUrl;
  private helper = new JwtHelperService();



  constructor(private http: HttpClient, private router: Router, private adminService: AdminService) {}

  /**
   * Lista clientes y sus mascotas
   * @param filtro
   * @param pagina
   * @param pageSize
   * @returns
   */
  getPagingLocalidades(filtro?: string, pagina?: number, pageSize?: number): Observable<any> {
    const params = new HttpParams()
      .set('filtro', filtro)
      .set('pagina', pagina?.toString())
      .set('pageSize', pageSize?.toString());
    return this.http.get(`${this.API_URL}/localidades/get_localidades`, {headers: this.getHttpHeaders(),  params: params });
  }

  /**
   * Lista clientes y sus mascotas
   * @param filtro
   * @param pagina
   * @param pageSize
   * @returns
   */
  getAllLocalidades(): Observable<any> {
    const params = new HttpParams()
      .set('filtro', '')
      .set('pagina', '0')
      .set('pageSize', '9999');
    return this.http.get(`${this.API_URL}/localidades/get_localidades`, {headers: this.getHttpHeaders(),  params: params });
  }


  /**
   * Obtiene los headers para realizar peticiones
   * @returns
   */
  private getHttpHeaders() {
    return  new HttpHeaders().set(
      'Content-Type',
      'application/json'
    ).set('Authorization', 'Bearer '.concat(this.adminService.getToken()));
  }
}
