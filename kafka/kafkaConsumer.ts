import {Topic} from "./topic"

export default interface KafkaConsumer {
  getTopic(): Topic
  consume({topic, partition, message}): Promise<void>
}
