import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';


import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { Debt } from 'src/app/api/models/clinic/debt';
import { DebtService } from 'src/app/api/services/clinic/debt.service';
import { Client } from 'src/app/api/models/clinic/client';



@Component({
  selector: 'app-debts-form',
  templateUrl: './debts-form.component.html',
  styleUrls: ['./debts-form.component.css'],
})
export class DebtFormComponent implements OnInit {

  @Output() debtEvent = new EventEmitter<object>();

  @Input() client = new Client();
  @Input() debt = new Debt();
  @Input() debtEdit: Debt = new Debt();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public debtService: DebtService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.debtEdit = Object.assign({}, this.debt);
  }

  /**
   * Guarda y actualiza un debt
   */
  async saveDebt(): Promise<void> {
    this.submitted = true;

    if (!this.debtEdit.ticketNumber) {
      return;
    }

    console.log(this.client)
    this.debtEdit.clientId = this.client.idc;

    this.notificationService.showInfo('DEBT.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.debtService.createDebt({ body: this.debtEdit })
    ).catch((error) => {
      this.notificationService.showError(`DEBT.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.debtEvent.emit(result);
      this.notificationService.showSuccess(`DEBT.SAVE.MESSAGE.OK`);
    }
  }

  async updateDebt(): Promise<void> {
    // Actualiza un debt

    this.notificationService.showInfo('DEBT.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.debtService.updateDebt({
        id: this.debtEdit._id,
        body: this.debtEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`DEBT.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.debtEdit = result;
      this.debtEvent.emit(this.debtEdit);
      this.notificationService.showSuccess(`DEBT.UPDATE.MESSAGE.OK`);
    }
  }
}
