import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';


import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/api/services/inventory/product.service';
import { StoreProviderService } from 'src/app/api/services/inventory/store-provider.service';
import { ProductTypeService } from 'src/app/api/services/inventory/product-type.service';
import { UnityTypeService } from 'src/app/api/services/inventory/unity-type.service';
import { Product } from 'src/app/api/models/inventory/product';
import { ProductType } from 'src/app/api/models/inventory/product-type';
import { StoreProvider } from 'src/app/api/models/inventory/store-provider';
import { UnityType } from 'src/app/api/models/inventory/unity-type';
import { NotificationService } from 'src/app/api/services/notification.service';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './productos-detail.component.html',
  styleUrls: ['./productos-detail.component.css'],
})
export class ProductosDetailComponent implements OnInit {


  @Input() product = new Product();

  titulo: string = 'Nuevo producto';
  producto!: Product;

  // SELECT DE COMBOS
  providers: Array<StoreProvider> = [];
  unities: Array<UnityType> = [];
  productTypes: Array<ProductType> = [];

  form: any;
  submitted: boolean = false;

  loading: boolean = false;
  isVisible: boolean = false;

  constructor(
    public productoService: ProductService,
    public proveedorService: StoreProviderService,
    public tipoProductService: ProductTypeService,
    public tipoUnidadService: UnityTypeService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private inventoryCache: InventoryCacheService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;

    const [productTypes, providers, unities] = await Promise.all([
      this.inventoryCache.getProductTypes(),
      this.inventoryCache.getProviders(),
      this.inventoryCache.getUnities(),
    ]);

    this.productTypes = productTypes;
    this.providers = providers;
    this.unities = unities;

    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;

      if (id) {
        this.product = await lastValueFrom(
          this.productoService.findOneProduct({ id: id })
        );
        if (this.product) {
          this.loading = false;
          // this.listOfDisplayData = [...this.client?.mascotas];
        }
      }
    });
  }


  findProductType(id: number) {
    return this.productTypes.find((p) => p.id === id);
  }

  findProvider(id: number) {
    return this.providers.find((p) => p.id === id);
  }

  findUnity(id: number) {
    return this.unities.find((p) => p.id === id);
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

   /**
   * Suscribe update pets in pet form component
   * @param client
   */
   onUpdateProduct(product: any) {
    // Update the product saved in the pet form modal
    // this.product = product;
    console.log(product)
    this.isVisible = false;
  }
}
