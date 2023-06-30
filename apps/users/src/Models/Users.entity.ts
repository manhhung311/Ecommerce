import { IsPhoneNumber } from 'class-validator';
import { Table, Column, Model, PrimaryKey, Unique, AllowNull, Length, HasMany, HasOne, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany, Default, DataType, DefaultScope } from 'sequelize-typescript';

@Table
export class Users extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @IsPhoneNumber('VN')
    @Column
    phoneNumber: string;

    @AllowNull(false)
    @Column
    activated: boolean;

}