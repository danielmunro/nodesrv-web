import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import PlayerService from "../../player/playerService"
import {MobEntity} from "../entity/mobEntity"
import MobService from "../mobService"

export default class MobCreateConsumer implements KafkaConsumer {
  constructor(
    private readonly mobService: MobService,
    private readonly playerService: PlayerService) {}

  public getTopic(): Topic {
    return Topic.MobCreate
  }

  public async consume({topic, partition, message}): Promise<void> {
    const data = JSON.parse(message.value.toString())
    const player = await this.playerService.getPlayer(data.player.uuid)
    const mobEntity = new MobEntity()
    mobEntity.player = player
    mobEntity.uuid = data.uuid
    mobEntity.race = data.raceType
    mobEntity.specialization = data.specializationType
    mobEntity.level = data.level
    await this.mobService.saveMob(mobEntity)
    console.log("creating player", mobEntity)
  }
}
