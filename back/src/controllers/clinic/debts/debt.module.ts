import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { debtProviders } from 'src/mongodb/providers/clinic/debt.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DebtController],
  providers: [DebtService, ...debtProviders],
})
export class DebtModule {}
