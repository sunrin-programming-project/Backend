import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('contest')
export class Contest {
    @ApiProperty({
            example: '2024 Layer7 CTF',
            description: '제목',
            required: true,
        })
    @PrimaryColumn()
    title: string;

    @ApiProperty({
        example: '선린인터넷고등학교',
        description: '주최',
        required: true,
    })
    @Column()
    host: string;

    @ApiProperty({
        example: '고등학생',
        description: '대상',
        required: true,
    })
    @Column()
    target: string;

    @ApiProperty({
        example: '04.18 ~ 05.18',
        description: '기간',
        required: true,
    })
    @Column()
    register: string;

    @ApiProperty({
        example: '마감임박',
        description: '상태',
        required: true,
    })
    @Column()
    status: string;

    @ApiProperty({
        example: 'D-18',
        description: '마감일',
        required: true,
    })
    @Column()
    dday: string;

    @ApiProperty({
        example: 'https://www.naver.com',
        description: '주최공고',
        required: true,
    })
    @Column()
    url: string;
    
}