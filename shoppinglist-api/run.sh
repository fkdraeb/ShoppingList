#!/bin/sh
mvn clean install
docker build -t shoppinglist-image .
docker stop shoppinglist-container
docker run -p 8090:8090 --rm --name shoppinglist-container --network tfnet shoppinglist-image
