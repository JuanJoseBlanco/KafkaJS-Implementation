// Implementación de dependencias KafkaJS
const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    //Creación de objeto Kafka para uso de conexiones como Consumer
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["hellmachine:9092"],
    });

    //Asignación de consumer al consumerGroup test
    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting... 🤖");
    await consumer.connect();
    console.log("Connected! 🥳");

    //Suscripción del consumer al topic Users
    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    //Ejecución del consumo de mensajes
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `RVD Msg ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    //En el consumidor, no se debe salir del proceso pues el debe estar consumiento los mensajes todo el tiempo. 
  }
}
