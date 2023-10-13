#!/bin/sh
docker build -t shoppinglist-web-image .
docker stop shoppinglist-web-container
docker run -d -p 8080:80 --rm --name shoppinglist-web-container --network tfnet shoppinglist-web-image

