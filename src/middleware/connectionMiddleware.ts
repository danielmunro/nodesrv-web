import {createConnection} from "typeorm"

export default async function(req, res, next) {
  await createConnection()
  next()
}
