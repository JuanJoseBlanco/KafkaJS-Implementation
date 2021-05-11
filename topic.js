// Implementación de dependencias KafkaJS
const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    //Creación de objeto Kafka para uso de conexiones como administrador
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["hellmachine:9092"],
    });
    
    //Creación de administrador para creación de topics
    const admin = kafka.admin();
    console.log("Connecting... 🤖");
    //Conexión como adminsitrador
    await admin.connect();    
    console.log("Connected! 🥳");

    //Partición 1: Nombres entre A-M
    //Partición 2: Nombres entre N-Z
    //Creación de Topics 
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created Successfully! ✅");
    await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex} 😢`);
  } finally {
    process.exit(0);
  }
}
