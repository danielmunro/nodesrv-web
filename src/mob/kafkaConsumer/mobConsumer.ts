import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import PlayerService from "../../player/playerService"
import {MobEntity} from "../entity/mobEntity"
import MobService from "../mobService"

export default class MobConsumer implements KafkaConsumer {
  constructor(
    private readonly mobService: MobService,
    private readonly playerService: PlayerService) {}

  public getTopic(): Topic {
    return Topic.Mob
  }

  public async consume({topic, partition, message}): Promise<void> {
    const data = JSON.parse(message.value.toString())
    const mobEntity = new MobEntity()
    if (data.player) {
      mobEntity.player = await this.playerService.findPlayer(data.player.uuid)
    }
    mobEntity.uuid = data.uuid
    mobEntity.race = data.raceType
    mobEntity.specialization = data.specializationType
    mobEntity.level = data.level
    await this.mobService.saveMob(mobEntity)
    console.log(`mob consumer -- ${mobEntity.uuid}`)
  }
}
