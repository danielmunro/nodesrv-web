import {createContainer} from "../container/containerFactory"
import {Container} from "inversify"

let container: Container

export default async function(req, res, next) {
  if (!container) {
    container = await createContainer()
  }
  next()
}
