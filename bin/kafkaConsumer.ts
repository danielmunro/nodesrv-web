import {Kafka} from "kafkajs"
import {createConnection, getConnection} from "typeorm"
import ConsumerInstance from "../src/kafka/consumerInstance"
import KafkaConsumer from "../src/kafka/kafkaConsumer"
import {MobEntity} from "../src/mob/entity/mobEntity"
import MobCreateConsumer from "../src/mob/kafkaConsumer/mobCreateConsumer"
import MobService from "../src/mob/mobService"
import {PlayerEntity} from "../src/player/entity/playerEntity"
import PlayerCreateConsumer from "../src/player/kafkaConsumer/playerCreateConsumer"
import PlayerService from "../src/player/playerService"

const kafka = new Kafka({
  clientId: "app",
  brokers: ["localhost:9092"],
})

async function createConsumerInstance(kafkaConsumer: KafkaConsumer): Promise<ConsumerInstance> {
  const consumer = kafka.consumer({groupId: kafkaConsumer.getTopic()})
  await consumer.connect()
  await consumer.subscribe({topic: kafkaConsumer.getTopic(), fromBeginning: true})
  return { consumer, kafkaConsumer }
}

async function run() {
  await createConnection()
  const connection = await getConnection()
  const playerRepository = connection.getRepository(PlayerEntity)
  const playerService = new PlayerService(playerRepository)
  const mobRepository = connection.getRepository(MobEntity)
  const mobService = new MobService(mobRepository)

  const consumerInstances = [
    await createConsumerInstance(new PlayerCreateConsumer(playerService)),
    await createConsumerInstance(new MobCreateConsumer(mobService, playerService)),
  ]
  await Promise.all(consumerInstances.map(async consumerInstance => consumerInstance.consumer.run({
    eachMessage: message => consumerInstance.kafkaConsumer.consume(message),
  })))
}

run().catch(console.error)
