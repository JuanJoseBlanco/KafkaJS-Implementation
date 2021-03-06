// Implementaci贸n de dependencias KafkaJS
const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    //Creaci贸n de objeto Kafka para uso de conexiones como administrador
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["hellmachine:9092"],
    });
    
    //Creaci贸n de administrador para creaci贸n de topics
    const admin = kafka.admin();
    console.log("Connecting... 馃");
    //Conexi贸n como adminsitrador
    await admin.connect();    
    console.log("Connected! 馃コ");

    //Partici贸n 1: Nombres entre A-M
    //Partici贸n 2: Nombres entre N-Z
    //Creaci贸n de Topics 
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created Successfully! 鉁?");
    await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex} 馃槩`);
  } finally {
    process.exit(0);
  }
}
