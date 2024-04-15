import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    email: number;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email_recieve: boolean;

    @Column()
    field: string;
}
