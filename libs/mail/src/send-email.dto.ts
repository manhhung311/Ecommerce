import { IUser } from "@app/common/Authentication/DTO/IUser.interface";


export class SendEmailDto {
  constructor(
    public readonly user: IUser,
    public readonly subject: string,
    public readonly template: string,
    public readonly context: { [key: string]: any },
  ) {}
}
