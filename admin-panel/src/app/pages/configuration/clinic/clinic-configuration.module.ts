import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicConfigurationComponent } from './clinic-configuration/clinic-configuration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { TranslationModule } from 'src/app/translation.module';
import { ProvinceComponent } from './provinces/provinces/provinces.component';
import { ProvincesFormComponent } from './provinces/provinces-form/provinces-form.component';



@NgModule({
  declarations: [ClinicConfigurationComponent, ProvinceComponent, ProvincesFormComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule,
    ToastrModule
  ]
})
export class ClinicConfigurationModule { }
