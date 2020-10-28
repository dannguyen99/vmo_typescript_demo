import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: string;
    name: {
        first_name: string;
        middle_name: string;
        last_name: string;
    };
    email: string;
    phone_number: string;
    gender: string  ;
    is_deleted?: string;
    modification_notes: ModificationNote[]
}