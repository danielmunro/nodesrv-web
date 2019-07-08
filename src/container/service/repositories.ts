import {AsyncContainerModule} from "inversify"
import {getConnection, Repository} from "typeorm"
import {Types} from "../types"
import {PlayerEntity} from "../../player/entity/playerEntity"

export default new AsyncContainerModule(async bind => {
  const connection = await getConnection()
  bind<Repository<PlayerEntity>>(Types.PlayerRepository).toConstantValue(connection.getRepository(PlayerEntity))
})
