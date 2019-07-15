import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import PlayerService from "../../player/playerService"
import MobService from "../mobService"

export default class DeathConsumer implements KafkaConsumer {
  constructor(
    private readonly mobService: MobService,
    private readonly playerService: PlayerService) {}

  public getTopic(): Topic {
    return Topic.Death
  }

  public async consume({topic, partition, message}): Promise<void> {
    const data = JSON.parse(message.value.toString())
    const killer = await this.mobService.getMob(data.killer.uuid)
    const killed = await this.mobService.getMob(data.killed.uuid)
    killer.player.kills++
    killed.player.deaths++
    await this.playerService.savePlayer(killer.player)
    await this.playerService.savePlayer(killed.player)
  }
}
