import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClienteModule } from './ClienteModule/cliente.module';
import { EstabelecimentoModule } from './EstabelecimentoModule/estabelecimento.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db',
      entities: ['/**/*.entity{.ts,.js}'],
    }),
    ClienteModule,
    EstabelecimentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
