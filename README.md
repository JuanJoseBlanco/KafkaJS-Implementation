# KafkaJS-Implementation

### [DOCUMENTACIÓN OFICIAL KAFKAJS] (https://kafka.js.org/)

Inicialmente, deben iniciarse los contenedores de **Apache Kafka** y **Zookeeper** que se inicializarán haciendo uso de las imagenes disponibles en el docker hub gracias a los siguientes comandos (también disponibles en el archivo  [docker-commands.text](https://github.com/JuanJoseBlanco/KafkaJS-Implementation/blob/main/docker-commands.txt))

## Inicialmente para Zookeeper 💂

docker run --name zookeeper -p 2181:2181 -d zookeeper

- La opción --name permite asignar un nombre al contenedor que se crea apartir de la imagen de zookeper
- La opción -p permite exponer los puertos en la máquina local necesarios para hacer uso de las imagenes. 
- La opción -d es opcional, y se encarga de correr los contenedor en segundo plano. 
- zookeeper hace referencia a la imagen de la que hará pull el comando para la inicialización del contenedor

## Posteriormente para Apache Kafka 🦖

Una vez que el contenedor de zookeeper esté arriba y corriendo, se procede a asignarle un broker de Apache Kafka mediante su imagen de docker hub con el siguiente comando: 

docker run -p 9092:9092 --name kafka -e KAFKA_ZOOKEEPER_CONNECT=machine_name:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://machine_name:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 

- La opción --name permite asignar un nombre al contenedor que se crea apartir de la imagen de zookeper
- La opción -p permite exponer los puertos en la máquina local necesarios para hacer uso de las imagenes. 
- La opción -d es opcional, y se encarga de correr el contenedor en segundo plano. 
- Las opciones que inician con el prefijo -e hacen referencia a variables de entorno y se explican con detalle a continuación: 
    - #### KAFKA_ZOOKEEPER_CONNECT=machine_name:2181
        Hace referencia al Zookeeper al que va a añadirse el actual broker que se está creando. En el apartado **machine_name** debe especificarse el nombre de la máquina local donde estarán corriendo los contenedores. Puede consultarse desde la consola de comandos corriendo el comando **Hostname**
    - #### KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://machine_name:9092
        Hace referencia a los brokers listeners que harán parte del cluster del zookeeper conectado anteriormente. Igualmente, especificar el nombre de la máquina local en el apartado **machine_name**
    - #### KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
        Específica al Zookeeper que solo va a crearse una instancia, ya que por defecto lo considera tres instancias. 
        

# EJECUCIÓN

1. Clonar el repositorio en el directorio de trabajo
2. Desde la consola de comandos ejecutar `npm install` para la instalación de las dependencias necesarias
3. Desde la consola de comandos ejecutar `node topic.js`. Esto creará la conexión con Apache Kafka y permitirá la creación de topics
4. Ejecutar `node producer.js mensaje`. En el apartado **mensaje** indicar el usuario que quiere ser enviado al topic. Luego de ser enviado mostrara un mensaje del tipo 
    `Send Successfully! [{"topicName": "Users", "partition": 0, "errorCode":0}]...` indicando toda la información del mensaje enviado e incluyendo la partición a la que se ha añadido. 
5. 
  
