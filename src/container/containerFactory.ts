import {Container} from "inversify"
import createConnection from "../db/createConnection"

export async function createContainer(): Promise<Container> {
  const app = new Container()
  await app.loadAsync(createConnection)
  return app
}
