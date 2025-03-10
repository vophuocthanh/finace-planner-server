import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { MonthliesModule } from './modules/monthlies/monthlies.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PersonalIncomesModule } from './modules/personal-incomes/personal-incomes.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { SavingsModule } from './modules/savings/savings.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { YearliesModule } from './modules/yearlies/yearlies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UserModule,
    RoleModule,
    MonthliesModule,
    CategoriesModule,
    PersonalIncomesModule,
    ExpensesModule,
    SavingsModule,
    InvestmentsModule,
    BudgetsModule,
    YearliesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // config de dung duoc HttpException
  ],
})
export class AppModule {}
