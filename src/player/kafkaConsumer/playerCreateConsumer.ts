import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import {PlayerEntity} from "../entity/playerEntity"
import PlayerService from "../playerService"

export default class PlayerCreateConsumer implements KafkaConsumer {
  constructor(private readonly playerService: PlayerService) {}

  public getTopic(): Topic {
    return Topic.PlayerCreate
  }

  public async consume({topic, partition, message}): Promise<void> {
    const player = JSON.parse(message.value.toString())
    const playerEntity = new PlayerEntity()
    playerEntity.email = player.email
    playerEntity.password = player.password
    playerEntity.uuid = player.uuid
    playerEntity.kills = 0
    playerEntity.deaths = 0
    console.log("creating player", playerEntity)
    await this.playerService.savePlayer(playerEntity)
  }
}
