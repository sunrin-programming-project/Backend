import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const typeORMConfig: TypeOrmModuleOptions = {
    type: "mariadb",
    host: process.env.DBHost,
    port: Number(process.env.DBPort),
    username: process.env.DBUser,
    password: process.env.DBPass,
    database: process.env.DBName,
    entities: [],
    synchronize: true
}