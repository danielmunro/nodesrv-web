export default interface KafkaConsumer {
  consume({topic, partition, message}): Promise<void>
}
