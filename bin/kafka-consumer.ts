import {Kafka} from "kafkajs"
import {createConnection, getConnection} from "typeorm"
import ConsumerInstance from "../src/kafka/consumerInstance"
import KafkaConsumer from "../src/kafka/kafkaConsumer"
import {MobEntity} from "../src/mob/entity/mobEntity"
import MobConsumer from "../src/mob/kafkaConsumer/mobConsumer"
import MobService from "../src/mob/mobService"
import {PlayerEntity} from "../src/player/entity/playerEntity"
import PlayerConsumer from "../src/player/kafkaConsumer/playerConsumer"
import PlayerService from "../src/player/playerService"
import DeathConsumer from "../src/mob/kafkaConsumer/deathConsumer"

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "app",
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
    await createConsumerInstance(new PlayerConsumer(playerService)),
    await createConsumerInstance(new MobConsumer(mobService, playerService)),
    await createConsumerInstance(new DeathConsumer(mobService, playerService)),
  ]
  await Promise.all(consumerInstances.map(async consumerInstance => consumerInstance.consumer.run({
    eachMessage: message => consumerInstance.kafkaConsumer.consume(message),
  })))
}

run().catch(console.error)
