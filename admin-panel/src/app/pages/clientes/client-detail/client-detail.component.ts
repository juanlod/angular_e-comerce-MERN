import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { Client } from 'src/app/api/models/client';
import { Locality } from 'src/app/api/models/locality';
import { Province } from 'src/app/api/models/province';
import { ClientsService } from 'src/app/api/services/clients.service';
import { Utils } from 'src/app/utils';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { NotificationService } from 'src/app/api/services/notification.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent
  extends ClienteFormComponent
  implements OnInit
{
  loading = true;
  isVisible = false;

  constructor(
    clientService: ClientsService,
    masterCacheService: MasterCacheService,
    route: ActivatedRoute,
    notificationService: NotificationService,
    router: Router
  ) {
    super(
      clientService,
      masterCacheService,
      route,
      notificationService,
      router
    );
  }

  async ngAfterViewInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;

      if (id) {
        this.client = await lastValueFrom(
          this.clientService.findOneClient({ id: id })
        );
        if (this.client) {
          console.log(this.client);
          this.client.feci = Utils.transformDate(
            this.client.feci,
            'yyyy-MM-dd',
            'en-US'
          );
          this.loading = false;
        }
      }
    });
  }

  showModal(): void {
    this.isEdit = false;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
