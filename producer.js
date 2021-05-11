// Implementación de dependencias KafkaJS
const { Kafka } = require("kafkajs");
//Variable donde se almacenará el mensaje a enviar recibida como argumento en el comando de ejecución. 
const msg = process.argv[2];

run();

async function run() {
  try {
    //Creación de objeto Kafka para uso de conexiones como Producer
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["hellmachine:9092"],
    });

    //Creación de administrador para producción de mensajes
    const producer = kafka.producer();
    console.log("Connecting... 🤖");
    //Conexión como Producer
    await producer.connect();
    console.log("Connected! 🥳");

    //Partición 1: Nombres entre A-M
    //Partición 2: Nombres entre N-Z
    //Validación de particiones
    const partition = msg[0] < "N" ? 0 : 1;
    //Envío de mensajes
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
    console.log(`Send Successfully! ✅ ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex} 😢`);
  } finally {
    process.exit(0);
  }
}
