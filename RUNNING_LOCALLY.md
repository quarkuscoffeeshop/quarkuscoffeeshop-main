# Running Locally

## Quarkus

Quarkus is easy to get started with.  You don't need to download anything because Maven will pull it for you when you run the individual microservices

[Quarkus.io](https://quarkus.io) is the best place to get started learning.  The [Guides](https://quarkus.io/guides/) are excellent!

## Dependencies

The application dependends on Kafka, PostgreSQL, and MongoDB.  This document includes instructions for running them locally with Docker and Docker Compose

You can of course install these locally as well, but the authors of this document recommend Docker and Docker Compose

### Docker-Compose

The documentation for Docker can be found here: [Docker](https://docs.docker.com/)
The doucmentation for Docker Compose can be found here: [Docker Compose](https://docs.docker.com/compose/)

_Tested with Docker for Desktop on Mac 2.4.0.0 (stable) and Docker Compose version 1.27.4, build 40524192_

#### docker-compose.yaml

The Docker Compose file, [docker-compose.yaml](docker-compose.yaml) contains Kafka, MongoDB, PostgreSQL, and PGAdmin4

### Kafka

#### Kafka Consumers and Producers

If you have Kafka's command line tools installed you can watch the topics with:

```shell script
kafka-console-consumer --bootstrap-server localhost:9092 --topic orders --from-beginning
kafka-console-producer --broker-list localhost:9092 --topic orders
```

If you are doing any development (and we love pull requests!), we recommend this approach

Check out the [Quickstart](https://kafka.apache.org/quickstart) for installation and getting started

### PostgreSQL

The PostgreSQL server is named, "receipts-db," which is important when setting up PGAdmin

### PGAdmin4

PGAdmin4 can be accessed at: http://localhost:5050/

You will need to create a connection to the Database

General tab:
* Name: receipts

Connection tab:
* Host: receipts-db
* Port: 5432
* Maintenance database: coffeeshopdb
* Username: coffeeshopuse
* Password: redhat-20

### MongoDB

[MongoDB Compass](https://www.mongodb.com/products/compass) is a useful GUI for MongoDB.  Installing it can make your life easier

Use the datasource connection found in the Counter microservice for the connection string: [application.properties](https://github.com/quarkuscoffeeshop/quarkuscoffeeshop-counter/blob/master/src/main/resources/application.properties)

## Quarkuscoffeeshop Microservices

## Running

All of the microservices can be run in [Quarkus' dev mode](https://quarkus.io/guides/getting-started#running-the-application) with the following command:

```shell script
./mvnw clean compile quarkus:dev
```

We recommend that you add the debug flag outlined below

## Debugging with your IDE

When started in dev mode Quarkus listens by default on 5005 for a debugger.  You can assign a different port with the flag "debug":

```shell script
./mvnw clean compile quarkus:dev -Ddebug=5006
```

We use the following ports based on which services are used most frequently:
* Web: 5005
* Counter: 5006
* Barista: 5007
* Kitchen: 5008
* Customermocker: 5009

## Environment variables

All of the microservices pull configuration from environment variables.  This is a little annoying locally, but mirrors the deployment environment and reduces careless mistakes

## Web

The Web microservice depends on several environment variables:
* KAFKA_BOOTSTRAP_URLS
* STREAM_URL
* CORS_ORIGINS

You can set them and start the server with the following commands:

```shell script
export KAFKA_BOOTSTRAP_URLS=localhost:9092 STREAM_URL=http://localhost:8080/dashboard/stream CORS_ORIGINS=http://localhost:8080
./mvnw clean compile quarkus:dev
```

## Counter

The Counter microservice depends on several environment variables:
* KAFKA_BOOTSTRAP_URLS
* MONGO_DB
* MONGO_URL
* MONGO_USERNAME
* MONGO_PASSWORD
* KAFKA_BOOTSTRAP_URLS

```shell script
export MONGO_DB=cafedb MONGO_URL=mongodb://cafe-user:redhat-20@localhost:27017/cafedb MONGO_USERNAME=cafe-user MONGO_PASSWORD=redhat-20 KAFKA_BOOTSTRAP_URLS=localhost:9092
./mvnw clean compile quarkus:dev
```

## Barista, Kitchen, and Inventory

The Barista, Kitchen, and Inventory microservices depends on a single environment variable for the Kafka url:
* KAFKA_BOOTSTRAP_URLS

```shell script
export KAFKA_BOOTSTRAP_URLS=localhost:9092 
./mvnw clean compile quarkus:dev
```


