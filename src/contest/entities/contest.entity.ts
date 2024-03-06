import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Contest {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    host: string;

    @Column()
    target: string;

    @Column()
    register: string;

    @Column()
    review: string;

    @Column()
    announce: string;

    @Column()
    status: string;

    @Column()
    dday: string;
    
}