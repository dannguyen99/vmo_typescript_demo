import { IsDate, IsNotEmpty, IsString } from "class-validator";

export interface IModificationNote {
  modified_on: Date;
  modified_by: string;
  modification_note: string;
}

export class ModificationNote implements IModificationNote {

  @IsNotEmpty()
  @IsDate()
  public modified_on: Date;

  public modified_by: string;

  @IsNotEmpty()
  @IsString()
  public modification_note: string;

  constructor(note: IModificationNote) {
    this.modified_on = note.modified_on;
    this.modified_by = note.modified_by;
    this.modification_note = note.modification_note;
  }
}

export enum response_status_codes {
  success = 200,
  bad_request = 400,
  internal_server_error = 500
}

export default ModificationNote;