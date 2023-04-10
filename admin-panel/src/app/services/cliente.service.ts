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
export class ClienteService {
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
  listar_clientes(filtro?: string, pagina?: number, pageSize?: number): Observable<any> {
    const params = new HttpParams()
      .set('filtro', filtro)
      .set('pagina', pagina?.toString())
      .set('pageSize', pageSize?.toString());
    return this.http.get(`${this.API_URL}/listar_clientes_admin_rol`, {headers: this.getHttpHeaders(),  params: params });
  }



  /**
   * Obtiene los headers para realizar peticiones
   * @returns
   */
  getHttpHeaders() {
    return  new HttpHeaders().set(
      'Content-Type',
      'application/json'
    ).set('Authorization', 'Bearer '.concat(this.adminService.getToken()));
  }
}
