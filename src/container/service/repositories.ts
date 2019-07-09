import {AsyncContainerModule} from "inversify"
import {Connection, Repository} from "typeorm"
import {PlayerEntity} from "../../player/entity/playerEntity"
import {Types} from "../types"

export default new AsyncContainerModule(async bind => {
  bind<Repository<PlayerEntity>>(Types.PlayerRepository)
    .toDynamicValue(app => app.container.get<Connection>(Types.Connection).getRepository(PlayerEntity))
    .inSingletonScope()
})
