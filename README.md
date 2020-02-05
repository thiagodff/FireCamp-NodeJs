# Backend Fire Camp

Fixar erros de padrões de código:

`yarn eslint --fix src --ext .js`

## Docker

### Criar database:

`sudo docker run --name databaseCAMP -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

### Principais comandos:

`sudo docker ps`

`sudo docker ps -a`

`sudo docker start databaseCAMP`

`sudo docker logs databaseCAMP`

## Sequelize-cli

### Migrations

`yarn sequelize migration:create --name=users`

`yarn sequelize db:migrate`

`yarn sequelize db:migrate:undo or :undo:all`

### Seeds

`yarn sequelize seed:generate --name admin-user`

`yarn sequelize db:seed:all`

## Background jobs com Redis

`sudo docker run --name redisCAMP -p 6379:6379 -d -t redis:alpine`
