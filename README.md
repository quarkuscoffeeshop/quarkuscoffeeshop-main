# Quarkus Coffeeshop

This is an Event-Driven, Supersonic, Subatomic demo application built with Quarkus, Kafka, and Kubernetes

## Microservices

The application consists of the following microservices,:
1. Web - the web front end (no way you saw that coming) 
1. Counter - coordinates events in the system
1. Barista - makes drinks
1. Kitchen - makes food
1. Inventory - stores and restocks the inventory for the Barista and Kitchen microservices

The applications have 1 hared dependency:
1. Domain - which contains the shared domain model

And one soft dependency:
1. Testutils - which contains optional classes that make testing easier

### Web

This service hosts the web front end and is the initial entry point for all orders.  Orders are sent to a Kafka topic, web-in, where they are picked up by the Core service.

This services listens to the web-updates topic and pushes updates to the web front end.

### Counter

This service orchestrates order related events between event producers and consumers 

### Barista

The barista services consumes "OrderIn" events, applies the business logic for making the beverage, and produces, "OrderUp" events

### Kitchen

The kitchen services consumes "OrderIn" events, applies the business logic for making the item, and produces, "OrderUp" events

### Domain

The domain contain shared objects representing the current state of the system's ubiquitous language

#### Shared Dependencies?!?

Shared dependencies are usually considered anathema in a microservices architecture.  This application follows DDD principles and the domain project implements the ubiquitous language and is considered important enough to force a dependency

### Test Utils

The test utilities have utilities for spinning up MongoDB and Kafka containers for use in integration tests.  It is not part of the production application

### JSON Service


## Working with Git Submodules

This repo contains submodules for all of the microservices code.  To check out all code (all submodules and the pom.xml in this directory) use the following:
```shell script
git clone --recurse-submodules
```
To update all of the submodules use the following:
```shell script
git submodule update --recursive --remote
```

Working with submodules can be a bit odd so if you're new to this workflow the submodules section from the Pro Git book is definitely recommended reading: https://git-scm.com/book/en/v2/Git-Tools-Submodules

### Building

This project contains a pom.xml that will build all of the microservices.  Simply clone the project and run:
```shell script
mvn clean install
```

If you didn't get the code for your submodules you can download it with:
```shell script
submodule update --init --recursive
```

### Developing

You can of course clone the submodules themselves and develop with your usual Git workflow.  If you are developing from a clone of this repository be sure to checkout a branch from within the submodule directory, and to commit and push from that directory.  You will then need to commit and push from this directory so that the .gitmodules file is updated with the latest commit of the submodule

