import {Container} from "inversify"
import {createContainer} from "../container/containerFactory"

let container: Container

export default async function(req, res, next) {
  if (!container) {
    container = await createContainer()
  }
  next()
}
