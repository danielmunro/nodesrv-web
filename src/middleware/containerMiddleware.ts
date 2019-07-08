import {createContainer} from "../container/containerFactory"

export default async function(req, res, next) {
  await createContainer()
  next()
}
