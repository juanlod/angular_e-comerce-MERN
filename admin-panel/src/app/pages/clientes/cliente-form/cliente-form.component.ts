import { Component, OnInit } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';

import { MasterCacheService } from '../../../api/cache/master-cache-service';
import { ClientsService } from 'src/app/api/services/clients.service';
import { Client } from 'src/app/api/models/client';
import { Province } from 'src/app/api/models/province';
import { Locality } from 'src/app/api/models/locality';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  client: Client = new Client();

  provinces: Province[] = [];
  provincesBackup: Province[] = [];
  localities: Locality[] = [];
  localitiesBackup: Locality[] = [];

  mapLocalityWithProvince : any;

  constructor(private clientService: ClientsService,
    private  masterCacheService: MasterCacheService) { }

  ngOnInit(): void {

   this.masterCacheService.getProvinces().then(provinces => {
    this.provinces = provinces
   });

   this.masterCacheService.getLocalities().then(localities => {
    this.localities = localities
    this.mapLocalitiesProvinces();
   });


  }


  async saveClient() {
    console.log(this.client)

    this.client = await lastValueFrom(this.clientService.createClient({body: this.client}))
  }


  async mapLocalitiesProvinces() {
    if (this.localities?.length > 0 && this.provinces?.length > 0) {
      this.localities = this.localities.map(locality => {
        const province = this.provinces.find(prov => prov.id === locality.dep);
        return {
          ...locality,
           province: province ? province.id : 0
        }
      });

      this.localitiesBackup = Object.assign([],  this.localities);
    }

  }

  /**
   * Cambia la localidad segun la provincia seleccionada
   */
  changeLocalities() {
    this.client.Loc = null;
    this.client.codp = null;
    this.localities = this.client.Dep ?  this.localitiesBackup.filter(locality => locality.province === this.client.Dep):  Object.assign([],  this.localitiesBackup);
  }

  /**
   * Establece el valor de la provincia a partir de la localidad seleccionada
   */
  changeProvince() {
    this.client.codp = null;

    if (this.client.Loc) {
      const localidad = this.localities.find(l => l.id === this.client.Loc);
      this.client.Dep = localidad.province;
      this.client.codp = localidad.cp;
    }
  }
}
