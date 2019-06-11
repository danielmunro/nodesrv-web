import {Kafka} from "kafkajs"
import {createConnection, getConnection} from "typeorm"
import {PlayerEntity} from "../src/player/entity/playerEntity"
import PlayerCreateConsumer from "../src/player/kafkaConsumer/playerCreateConsumer"

const kafka = new Kafka({
  clientId: "app",
  brokers: ["localhost:9092"],
})

const consumer = kafka.consumer({groupId: "testGroup"})

async function run() {
  await createConnection()
  const connection = await getConnection()
  const playerRepository = connection.getRepository(PlayerEntity)
  await consumer.connect()
  await consumer.subscribe({topic: "player.create", fromBeginning: true})
  const playerCreateConsumer = new PlayerCreateConsumer(playerRepository)
  await consumer.run({
    eachMessage: message => playerCreateConsumer.consume(message),
  })
}

run().catch(console.error)
