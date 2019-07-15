import {Repository} from "typeorm"
import {MobEntity} from "./entity/mobEntity"

export default class MobService {
  constructor(private readonly mobRepository: Repository<MobEntity>) {}

  public saveMob(mobEntity: MobEntity) {
    return this.mobRepository.save(mobEntity)
  }

  public async getMob(uuid: string): Promise<MobEntity> {
    const mob = await this.mobRepository.findOne({ uuid })
    if (!mob) {
      throw new Error(`unknown mob uuid: ${uuid}`)
    }

    return mob
  }
}
