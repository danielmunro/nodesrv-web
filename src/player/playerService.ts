import {Repository} from "typeorm"
import {PlayerEntity} from "./entity/playerEntity"

export default class PlayerService {
  constructor(private readonly playerRepository: Repository<PlayerEntity>) {}

  public savePlayer(playerEntity: PlayerEntity) {
    return this.playerRepository.save(playerEntity)
  }

  public async findPlayer(uuid: string): Promise<PlayerEntity> {
    return this.playerRepository.findOne({ uuid })
  }
}
