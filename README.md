# Quarkus Coffeeshop

This is an Event-Driven, Supersonic, Subatomic demo application built with Quarkus, Kafka, and Kubernetes

## Git Submodules

This repo contains submodules for all of the microservices code.  To check out all code (all submodules and the pom.xml in this directory) use the following:
```shell script
git clone --recurse-submodules
```
To update all of the submodules use the following:
```shell script
git submodule update --recursive --remote
```

Working with submodules can be a bit odd so if you're new to this workflow the submodules section from the Pro Git book is definitely recommended reading: https://git-scm.com/book/en/v2/Git-Tools-Submodules

## Building

This project contains a pom.xml that will build all of the microservices.  Simply clone the project and run:
```shell script
mvn clean install
```

If you didn't get the code for your submodules you can download it with:
```shell script
submodule update --init --recursive
```

## Developing

You can of course clone the submodules themselves and develop with your usual Git workflow.  If you are developing from a clone of this repository be sure to checkout a branch from within the submodule directory, and to commit and push from that directory.  You will then need to commit and push from this directory so that the .gitmodules file is updated with the latest commit of the submodule

