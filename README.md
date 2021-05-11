# KafkaJS-Implementation

Inicialmente, deben iniciarse los contenedores de **Apache Kafka** y **Zookeeper** que se inicializarán haciendo uso de las imagenes disponibles en el docker hub gracias a los siguientes comandos (también disponibles en el archivo  [docker-commands.text](https://github.com/JuanJoseBlanco/KafkaJS-Implementation/blob/main/docker-commands.txt))

## Inicialmente para Zookeeper

docker run --name zookeeper -p 2181:2181 -d zookeeper

- La opción --name permite asignar un nombre al contenedor que se crea apartir de la imagen de zookeper
- La opción -p permite exponer los puertos en la máquina local necesarios para hacer uso de las imagenes. 
- La opción -d es opcional, y se encarga de correr los contenedor en segundo plano. 
- zookeeper hace referencia a la imagen de la que hará pull el comando para la inicialización del contenedor

## Posteriormente para Apache Kafka

Una vez que el contenedor de zookeeper esté arriba y corriendo, se procede a asignarle un broker de Apache Kafka mediante su imagen de docker hub con el siguiente comando: 

docker run -p 9092:9092 --name kafka -e KAFKA_ZOOKEEPER_CONNECT=machine_name:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://machine_name:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 

- La opción --name permite asignar un nombre al contenedor que se crea apartir de la imagen de zookeper
- La opción -p permite exponer los puertos en la máquina local necesarios para hacer uso de las imagenes. 
- La opción -d es opcional, y se encarga de correr el contenedor en segundo plano. 
- Las opciones que inician con el prefijo -e hacen referencia a variables de entorno y se explican con detalle a continuación: 








Implementation of Apache Kafka with NodeJS using KafkaJS.
