docker stop postgres-server
docker network rm tfnet
docker network create tfnet
docker run -p 5432:5432 --rm --name postgres-server -e POSTGRES_PASSWORD=postgres \
  --network tfnet -d postgres:14.3-alpine

docker stop shoppinglist-container
cd shoppinglist-api
sh run.sh

docker stop shoppinglist-web-container
cd ../shoppinglist-web/
sh run.sh
