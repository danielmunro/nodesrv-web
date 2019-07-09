import {Container} from "inversify"
import connection from "./service/connection"
import repositories from "./service/repositories"

let app: Container

export async function createContainer(): Promise<Container> {
  app = new Container()
  await app.loadAsync(connection, repositories)
  return app
}

export function getContainer(): Container {
  return app
}
