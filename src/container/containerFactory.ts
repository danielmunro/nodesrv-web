import {Container} from "inversify"
import repositories from "./service/repositories"
import connection from "./service/connection"

let app: Container

export async function createContainer(): Promise<Container> {
  console.log("create container")
  app = new Container()
  await app.loadAsync(connection, repositories)
  return app
}

export function getContainer(): Container {
  return app
}
