import { BaseRepository } from "@app/common/Repositories/BaseRepository";
import { Token } from "../Models/Tokens.entity";
import { OldToken } from "../Models/OldToken.entity";


export class OldTokenRepository extends BaseRepository<OldToken> {
    constructor() {
        super(OldToken);
    }

    public async findByToken(token: string):Promise<OldToken> {
        return OldToken.findOne({
            where: {
                refreshToken: token
            }
        });
    }

}