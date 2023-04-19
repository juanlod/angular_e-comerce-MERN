import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { ClientsService } from 'src/app/api/services/clients.service';
import { Utils } from 'src/app/utils';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Coat } from 'src/app/api/models/coat';
import { Race } from 'src/app/api/models/race';
import { Sex } from 'src/app/api/models/sex';
import { Species } from 'src/app/api/models/species';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

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
  petsSex: Sex[] = [];
  petsRace: Race[] = [];
  petsSpecies: Species[] = [];
  petsCoat: Coat[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: any[] = [];
  faPaw = faPaw;

  svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
  <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
  <g><path d="M41.7,902.2c0,0,51.2,7.6,51.2-14.6c0-22.1-70.4-14-34.3-67.5c35.8-53.2,172.3-85.9,188.8-188c0.1-0.7,0.2-1.5,0.4-2.3c7-28.5,44.5,69,34.9,102.1c-9.6,33.2-0.9,81.2,23.6,107.4s74.2,98.7,97.8,51.5c22.7-38.4-95.1-48.9-65.5-137.1c15.7-27.1,52.4-66.4,61.1-171.1c41.9,47.1,137.1,75.1,199,65.5c17.2,9.9-37.5,245.3-0.9,253.2c36.7,7.9,69,13.1,69-11.3c0,0-2.6-21.8-34.1-22.7c0,0-9.6-28.8,4.4-36.7c14-7.9,12.2,41,41.9,54.1c29.7,13.1,49.8,11.4,49.8-13.1s-57.6-15.7-59.4-71.6c-1.8-55.9,18.9-120.8,45.7-162.1c26.8-41.3,72.2-156.6,65.2-231.6c-7-75.1,83.8-59.4,101.3-55.9c17.5,3.5,108.2,8.7,108.2-45.4c0,0,7-52.4-50.6-52.4c0,0-24.4-14-27.9-36.7c-3.5-22.7-19.2-34.9-31.4-36.7l3.1-71.6l-45,48.5l10.5-64.1c0,0-153.7,241-354.4,281.1c-200.8,40.2-382.4,36.7-401.6,36.7s-26.2,20.9-14,29.7c12.2,8.7,94.3-3.5,92.5,14c-1.8,17.4-69.8,69.8-61.1,143.2c8.7,73.3-22.6,66.4-37.5,90.8C41.1,731.1-31.6,902.2,41.7,902.2z"/></g>
  </svg>`

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

    const [petsSex, petsRace, petsSpecies, petsCoat] = await Promise.all([
      this.masterCacheService.getSex(),
      this.masterCacheService.getRace(),
      this.masterCacheService.getSpecies(),
      this.masterCacheService.getCoat(),
    ]);

    this.petsSex = petsSex;
    this.petsRace = petsRace;
    this.petsSpecies = petsSpecies;
    this.petsCoat = petsCoat;


    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;

      if (id) {
        this.client = await lastValueFrom(
          this.clientService.findOneClient({ id: id })
        );
        if (this.client) {
          this.client.feci = Utils.transformDate(
            this.client.feci,
            'yyyy-MM-dd',
            'en-US'
          );
          this.loading = false;
          this.listOfDisplayData = [...this.client?.mascotas];

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


  getPetSex(id: number) {
    return  id && id !== 0 ? this.petsSex.filter(sex => sex.ids === id)[0]?.value : '';
  }

  getPetRace(id: number) {
    return  id && id !== 0 ? this.petsRace.filter(race => race.id === id)[0]?.nom : '';
  }

  getPetSpecie(id: number) {
    return  id && id !== 0 ? this.petsSpecies.filter(specie => specie.id === id)[0]?.nom : '';
  }

  getPetSpecieIcon(id: number) {
    return  id && id !== 0 ? this.petsSpecies.filter(specie => specie.id === id)[0]?.icon : '';
  }



  async petDetail(id: string) {
    this.router.navigate(['dashboard/clients/pets/detail', id]);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
    this.listOfDisplayData = [...this.client.mascotas]
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfDisplayData.filter((item: any) => item.nom.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
  }
}
