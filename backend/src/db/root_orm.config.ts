//import { SnakeNamingStrategy } from './snake-naming.strategy';
import { DefaultNamingStrategy } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import appConfiguration from '../app.configuration';
import { join } from 'path';

module.exports = {
    type: appConfiguration().DB.TYPE as any,
    host: appConfiguration().DB.HOST,
    port: Number(appConfiguration().DB.PORT),
    username: appConfiguration().DB.USERNAME,
    password: appConfiguration().DB.PASSWORD,
    database: appConfiguration().DB.DATABASE,
    url: appConfiguration().DB.URL,
    schema: 'public',
    synchronize: false,
    autoLoadEntities: true,
    namingStrategy: new DefaultNamingStrategy(),
    entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')],
} as TypeOrmModuleOptions;