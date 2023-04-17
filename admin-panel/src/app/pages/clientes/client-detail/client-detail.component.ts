import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Client } from 'src/app/api/models/client';
import { ClientsService } from 'src/app/api/services/clients.service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Client = new Client();


  constructor(private  clientService: ClientsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
        } else {
          this.client = new Client();
        }
      }
    });
  }

}
