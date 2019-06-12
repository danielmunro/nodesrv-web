import {Repository} from "typeorm"
import {PlayerEntity} from "./entity/playerEntity"

export default class PlayerService {
  constructor(private readonly playerRepository: Repository<PlayerEntity>) {}

  public savePlayer(playerEntity: PlayerEntity) {
    return this.playerRepository.save(playerEntity)
  }

  public async getPlayer(uuid: string): Promise<PlayerEntity> {
    const player = await this.playerRepository.findOne({ uuid })
    if (!player) {
      throw new Error(`unknown player uuid: ${uuid}`)
    }

    return player
  }
}
