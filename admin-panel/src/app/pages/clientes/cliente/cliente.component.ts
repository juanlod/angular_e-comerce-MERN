import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, lastValueFrom, of } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // this.listarClientes();
  }


  /**
   * Obtiene la lista de clientes
   */
  async listarClientes() {
    this.loading = true;
    this.clientes = [];
    const response = (await lastValueFrom(
      this.clienteService.listar_clientes_admin_rol(
        this.filtro,
        this.pageIndex,
        this.pageSize
      )
    )) as any;
    this.clientes = response.data;
    this.totalResults = response.total_resultados;
    this.totalPages = response.total_paginas > 0 ? response.total_paginas : 1;
    this.loading = false;
  }

  /**
   * Se ejecuta con los cambios de la tabla
   * @param params
   */
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.listarClientes();
  }

  /**
   * Resetea el filtro de busqueda
   */
  reset(): void {
    this.filtro = '';
    this.search();
  }

  /**
   * Realiza la busqueda
   */
  search(): void {

    this.visible = false;
    this.listarClientes();
  }

  /**
   * Muestra y oculta la informacion adicional
   * @param id
   * @param checked
   */
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

/**
 * Comprueba si existe el nombre del cliente en el filtro de palabras
 * @param cliente
 * @returns
 */
  checkFiltro(cliente: any): boolean {

    if (!this.filtro) {
      return false;
    }
    const palabras = this.filtro.split(',').map((p) => p.trim());
    return palabras.some((p) => cliente.ayn.toLowerCase().includes(p.toLowerCase()));
  }

  /**
   * Comprueba si existe el  nombre de la mascota en el filtro de palabras
   * @param mascota
   * @returns
   */
  checkFiltroMascota(mascota?: any): boolean {
    if (!this.filtro) {
      return false;
    }

    const palabrasClave = this.filtro.split(',').map((p) => p.trim());
    const mascotaNombre = mascota.nom.toLowerCase();
    return palabrasClave.some((p) => mascotaNombre.includes(p.toLowerCase()));
  }


  addClient() {
    console.log('add')
  }
}
