import {Container} from "inversify"
import repositories from "./service/repositories"

export async function createContainer(): Promise<Container> {
  const app = new Container()
  await app.loadAsync(repositories)
  return app
}
