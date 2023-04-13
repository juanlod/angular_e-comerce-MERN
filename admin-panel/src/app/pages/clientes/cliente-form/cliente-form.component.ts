import { Component, OnInit } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { LocalidadService } from 'src/app/api/services/localidad.service';
import { ProvinciaService } from 'src/app/api/services/provincia.service';
import { Cliente } from 'src/app/models/cliente';
import { Localidad } from 'src/app/models/localidad';
import { Provincia } from 'src/app/models/provincia';
import { MasterCacheService } from '../../../api/cache/master-cache-service';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = new Cliente();

  provincias: Provincia[] = [];
  provinciasBackup: Provincia[] = [];
  localidades: Localidad[] = [];
  localidadesBackup: Localidad[] = [];

  mapLocalidadesConProvincias : any;

  constructor(private provinciaService: ProvinciaService, private localidadService: LocalidadService,
    private  masterCacheService: MasterCacheService) { }

  ngOnInit(): void {

   this.masterCacheService.getProvincias().then(provinces => {
    this.provincias = provinces.data
   });

   this.masterCacheService.getLocalidades().then(localities => {
    this.localidades = localities.data
    this.mapLocalidadesProvincias();
   });


  }


  saveClient() {
    console.log(this.cliente)
  }


  async mapLocalidadesProvincias() {
    if (this.localidades.length > 0 && this.provincias.length > 0) {
      this.localidades = this.localidades.map(localidad => {
        const provincia = this.provincias.find(prov => prov.id === localidad.dep);
        return {
          ...localidad,
           provincia: provincia ? provincia.id : 0
        }
      });

      this.localidadesBackup = Object.assign([],  this.localidades);
    }

  }

  /**
   * Cambia la localidad segun la provincia seleccionada
   */
  changeLocalities() {
    this.cliente.Loc = null;
    this.localidades = this.cliente.Dep ?  this.localidadesBackup.filter(localidad => localidad.provincia === this.cliente.Dep):  Object.assign([],  this.localidadesBackup);
  }

  /**
   * Establece el valor de la provincia a partir de la localidad seleccionada
   */
  changeProvince() {
    if (this.cliente.Loc) {
      this.cliente.Dep = this.localidades.find(l => l.id === this.cliente.Loc).provincia;
    }
  }
}
