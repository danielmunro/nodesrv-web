import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import {PlayerEntity} from "../entity/playerEntity"
import PlayerService from "../playerService"

export default class PlayerConsumer implements KafkaConsumer {
  private static createPlayerEntity(data: any): PlayerEntity {
    const playerEntity = new PlayerEntity()
    playerEntity.email = data.email
    playerEntity.uuid = data.uuid
    return playerEntity
  }

  constructor(private readonly playerService: PlayerService) {}

  public getTopic(): Topic {
    return Topic.Player
  }

  public async consume({topic, partition, message}): Promise<void> {
    const player = JSON.parse(message.value.toString())
    const existingPlayerEntity = await this.playerService.findPlayer(player.uuid)
    const playerEntity = existingPlayerEntity ?
      existingPlayerEntity :
      PlayerConsumer.createPlayerEntity(player)
    playerEntity.password = player.password
    playerEntity.kills = player.kills
    playerEntity.deaths = player.deaths
    playerEntity.lastLogin = player.lastLogin
    await this.playerService.savePlayer(playerEntity)
    console.log(`consume player -- ${playerEntity.uuid}`)
  }
}
