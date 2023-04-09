import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private API_URL = environment.apiUrl;
  private helper = new JwtHelperService();

  private HTTP_HEADERS = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient, private router: Router) {}

  // listar_clientes_admin_rol(): Observable<any> {
  //   return this.http.get(`${this.API_URL}/listar_clientes_admin_rol`);
  // }


  listar_clientes_admin_rol(filtro?: string, pagina?: number, pageSize?: number): Observable<any> {
    const params = new HttpParams()
      .set('filtro', filtro)
      .set('pagina', pagina?.toString())
      .set('pageSize', pageSize?.toString());

    return this.http.get(`${this.API_URL}/listar_clientes_admin_rol`, { params });
  }
}
