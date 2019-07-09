import {AsyncContainerModule} from "inversify"
import {Connection, createConnection} from "typeorm"
import {Types} from "../types"

export default new AsyncContainerModule(async bind => {
  const connection = await createConnection()
  bind<Connection>(Types.Connection).toDynamicValue(() => connection).inSingletonScope()
})
