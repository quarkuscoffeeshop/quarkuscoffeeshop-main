***NOTE*** This repository is deprecated

# Docs
Please see the Github Pages Site for complete documentation: [quarkuscoffeeshop.github.io](https://quarkuscoffeeshop.github.io)

# Quarkus Coffeeshop

This is an Supersonic, Subatomic, Event-Driven demo built with Quarkus, Kafka (AMQ Streams), and Kubernetes (OpenShift)

## Microservices

The application consists of the following microservices,:
1. Web - the web front end (no way you saw that coming) 
1. Counter - coordinates events in the system
1. Barista - makes drinks
1. Kitchen - makes food
1. Inventory - stores and restocks the inventory for the Barista and Kitchen microservices


The applications have 2 shared dependency:
1. Domain - which contains the shared domain model

Shared dependencies are of course a bad idea in a Microservices Architecture so we'll talk about why this exists

And one optional dependency:
1. Testutils - which contains optional classes that make testing easier

### Web

This service hosts the web front end and is the initial entry point for all orders.  Orders are sent to a Kafka topic, where they are picked up by the Counter service

This services listens to another Kafka topic for updates and streams updates to the html page with server sent events

### Counter

This service orchestrates and persists order related events

### Barista

The barista services consumes "OrderIn" events, applies the business logic for making the beverage, and produces, "OrderUp" events.  The terms "OrderIn" and "OrderUp" are part of our ubiquitous language

### Kitchen

The kitchen services consumes "OrderIn" events, applies the business logic for making the item, and produces, "OrderUp" events.    The terms "OrderIn" and "OrderUp" are part of our ubiquitous language

### Domain

The domain contains the shared domain model (ubiquitous language)

#### Shared Dependencies?!?

Shared dependencies are considered anathema in a microservices architecture.  This application follows DDD principles and the domain project implements the ubiquitous language and is considered important enough to force a dependency

### Test Utils

The test utilities have utilities for spinning up MongoDB and Kafka containers for use in integration tests.  It is not part of the production application

## Working with Git Submodules

Working with submodules is a bit odd so if you're new to this workflow the [submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) section from the [Pro Git](https://git-scm.com/book/en/v2/Git-Tools-Submodules) book is definitely recommended reading: [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

This repo contains submodules for all of the microservices code.  To check out all code (all submodules and the pom.xml in this directory) use the following:

```shell script
git clone --recurse-submodules
```
To update all of the submodules use the following:
```shell script
git submodule update --recursive --remote
```

### Building

This project contains a pom.xml that will build all of the microservices.  Simply clone the project and run:
```shell script
mvn clean install
```

If you didn't get the code for your submodules you can download it with:
```shell script
submodule update --init --recursive
```

### Installing on OpenShift

Two steps are required to install on OpenShift:
1. an Ansible role
1. a Helm chart

The Ansible role:
1. sets up the namespace if it doesn't already exist
1. installs the AMQ Streams Operator
1. creates the Kafka topics
1. installs MongoDB

The Helm chart:
1. installs the application

You can find the Helm chart in [quarkuscoffeeshop-helm](https://github.com/quarkuscoffeeshop/quarkuscoffeeshop-helm)

The [quarkuscoffeeshop-helm wiki](https://github.com/quarkuscoffeeshop/quarkuscoffeeshop-helm/wiki) contains detailed instructions for the installation

### Developing

You can of course clone the submodules themselves and develop with your usual Git workflow.  If you are developing from a clone of this repository be sure to checkout a branch from within the submodule directory, and to commit and push from that directory.  You will then need to commit and push from this directory so that the .gitmodules file is updated with the latest commit of the submodule

We gladly accept pull-requests!  If you are interested in joining the organization just let us know

