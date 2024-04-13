import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email_recieve: boolean;

    @Column()
    email: string;

    @Column()
    field: string;
}
