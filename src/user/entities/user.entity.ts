import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    googleId: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    email_recieve: boolean;

    @Column()
    field: string;

    @Column()
    refresh_token: string;
}
