 import { BaseRepository } from "@app/common/Repositories/BaseRepository";
import { Op } from "sequelize";
import { Users } from "../Models/Users.entity";


export class UserRepository extends BaseRepository<Users> {
    constructor() {
        super(Users);
    }
}