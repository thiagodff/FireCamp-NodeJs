# Backend GYMPOINT

Fixar erros de padrões de código:

`yarn eslint --fix src --ext .js`

## Docker

`sudo docker run --name databaseGYM -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

### Principais comandos:

`sudo docker ps`

`sudo docker ps -a`

`sudo docker start databaseGYM`

`sudo docker logs databaseGYM`

## Sequelize

### Migrations

`yarn sequelize migration:create --name=users`

`yarn sequelize db:migrate`

`yarn sequelize db:migrate:undo or :undo:all`
