import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `168.75.103.246`,
  port: 5432,
  username: 'postgres',
  password: 'renan0123',
  database: 'beautyontest',
  entities: ['dist/database/models/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/**/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
