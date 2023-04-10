import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, lastValueFrom, of } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
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

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  async listarClientes() {
    this.loading = true;
    this.clientes = [];
    const response = await lastValueFrom(this.clienteService.listar_clientes_admin_rol(this.filtro, this.pageIndex, this.pageSize)) as any;
    console.log(response)
    this.clientes = response.data;
    this.totalResults = response.total_resultados;
    this.totalPages = response.total_paginas > 0 ? response.total_paginas : 1 ;
    this.loading = false;
  }


  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort} = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.listarClientes();
  }


  reset(): void {
    this.filtro = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listarClientes()
  }


  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }


  checkFiltro(cliente: any): boolean {
    if (cliente.mascotas) {
      for (const mascota of cliente.mascotas) {
        if (mascota.nom.toLowerCase().includes(this.filtro.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }
}
