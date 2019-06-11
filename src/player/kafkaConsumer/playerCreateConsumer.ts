import KafkaConsumer from "../../kafka/kafkaConsumer"
import {PlayerEntity} from "../entity/playerEntity"
import PlayerService from "../playerService"

export default class PlayerCreateConsumer implements KafkaConsumer {
  constructor(private readonly playerService: PlayerService) {}

  public async consume({topic, partition, message}): Promise<void> {
    const player = JSON.parse(message.value.toString())
    const playerEntity = new PlayerEntity()
    playerEntity.email = player.email
    playerEntity.password = player.password
    playerEntity.uuid = player.uuid
    await this.playerService.savePlayer(playerEntity)
  }
}
