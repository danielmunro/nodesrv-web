import {createConnection, getConnection} from "typeorm"

export default async function(req, res, next) {
  console.log("connection middleware")
  const connection = await getConnection()
  if (!connection) {
    console.log("create new connection in connection middleware")
    await createConnection()
  }
  next()
}
