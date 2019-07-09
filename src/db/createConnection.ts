import {AsyncContainerModule} from "inversify"
import {Connection, createConnection} from "typeorm"
import {Types} from "../container/types"

export default new AsyncContainerModule(async bind => {
  bind<Connection>(Types.Connection).toConstantValue(await createConnection())
})
