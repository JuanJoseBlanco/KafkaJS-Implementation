// Implementaci贸n de dependencias KafkaJS
const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    //Creaci贸n de objeto Kafka para uso de conexiones como Consumer
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["hellmachine:9092"],
    });

    //Asignaci贸n de consumer al consumerGroup test
    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting... 馃");
    await consumer.connect();
    console.log("Connected! 馃コ");

    //Suscripci贸n del consumer al topic Users
    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    //Ejecuci贸n del consumo de mensajes
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Consuming message ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    //En el consumidor, no se debe salir del proceso pues el debe estar consumiento los mensajes todo el tiempo. 
  }
}
