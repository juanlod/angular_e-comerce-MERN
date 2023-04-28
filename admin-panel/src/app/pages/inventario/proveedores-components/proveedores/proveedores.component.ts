import { Component, OnInit, Provider } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { StoreProviderService } from 'src/app/api/services/inventory/store-provider.service';
import { StoreProvider } from 'src/app/api/models/inventory/store-provider';

@Component({
  selector: 'app-providers',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {

  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  provider = new StoreProvider();
  selectedProvider = new StoreProvider();

  providers: StoreProvider[] = [];
  page: any;
  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: StoreProviderService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService
  ) {}

  async ngOnInit(): Promise<void> {}

  /**
   * Obtiene la lista de providers
   */
  async getProviders() {
    this.loading = true;
    this.providers = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingStoreProvider({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.providers = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.providers = response.data;
      this.totalResults = response.total_resultados;
      this.totalPages = response.total_paginas > 0 ? response.total_paginas : 1;
      this.loading = false;
    }
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
    this.getProviders();
  }


  showModal(provider?: StoreProvider) {
    this.isVisible = true;

    if (provider) {
      this.selectedProvider = provider;
    }

  }

  providerDetail(id: string) {
    this.router.navigate(['dashboard/inventory/providers/detail', id]);
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getProviders();
  }

  reset() {
    this.filtro = '';
    this.search();
  }


  onUpdateProvider(provider: any) {
    console.log('provider')
    this.isVisible = false;
    this.getProviders();
  }
}
