import { PrimaryGeneratedColumn,Entity,Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"users"})
export class User extends BaseEntity  {
    @PrimaryGeneratedColumn({type:"int"})
    id?: number;

    @Column({type:"varchar",nullable:false})
    name: string;

    @Column({type:"varchar",nullable:false})
    lastName: string;

    @Column({type:"varchar",nullable:false})
    sexo: string;

    @Column({type:"varchar",nullable:false})
    city: string;

    @Column({type:"int",nullable:false})
    age: number;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
