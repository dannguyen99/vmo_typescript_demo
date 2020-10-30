import { ModificationNote } from "../common/model";
import { IsBoolean, IsEmail, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength, ValidateNested } from "class-validator";

export interface IUser {
    _id?: string;
    name: string,
    email: string;
    phone_number: string;
    gender: string;
    is_deleted?: boolean;
    modification_notes: ModificationNote[]
}

export class User implements IUser {

    @IsOptional()
    @IsMongoId()
    public _id: string;

    @IsNotEmpty()
    @MaxLength(60)
    public name: string;

    @IsNotEmpty()
    @IsEmail(undefined)
    public email: string;


    @IsNotEmpty()
    @IsPhoneNumber('VN')
    public phone_number: string;

    @IsNotEmpty()
    @IsIn(["Male", "Female"])
    public gender: string;

    @IsOptional()
    @IsBoolean()
    public is_deleted: boolean;

    @IsNotEmpty()
    @ValidateNested({
        each: true
    })
    public modification_notes: ModificationNote[];

    constructor(user: IUser) {
        this.name = user.name;
        this.email = user.email;
        this.phone_number = user.phone_number;
        this.gender = user.gender;
        this.modification_notes = user.modification_notes;
    }
}

export default User;
