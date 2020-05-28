# Tic Tac Toe Online

TicTacToe Online est un jeu de morpion en ligne, le but est simple : on ouvre l'application, on crée une room et on attends que quelqu'un rejoigne celle-ci afin de participer à une bataille endiablée !

## Installer le serveur

Vous pouvez installer le projet via un docker-compose disponible dans `/docker`

Avant ça, il vous faut créer un fichier `.env` dans ce dossier.

```
# Fichier .env example
COMPOSE_PROJECT_NAME=matchmaking
PHPMYADMIN_PORT=8085
API_PORT=3000
UID=1000
GID=1000
DOCKER_USER=workspace
DOCKER_COMMAND=dev
```

Il vous suffit de taper la commande

```bash
docker-compose up
```

Et voilà ! Le serveur est prêt à accueillir des connexions.

## Installer le client

Pour installer le client il faut taper ces commandes :

```bash
npm install
npm run electron:build
npm run electron
```

Celui-ci va donc se lancer et laisser apparaitre le TicTacToe.

## Development

### environment

Using docker :

- Copy `docker/.env.example` into `docker/.env`
- Run command `id`
- Edit `docker/.env` and add your `GID` and `UID`
- If you are on Windows :
  - `UID` and `GID` vars are ignored, but you can set it to `0`
  - Set var `DOCKER_USER` to `root` and `DOCKER_COMMAND` to `dev-l`
- Run command `docker-compose up` inside `docker`
- To shutdown press `CTRL+C` and then run `docker-compose down`
- To rebuild image run `docker-compose up --build`
- To run npm commands :

```bash
docker exec -it {name} bash # {name} should be matchmaking_api_1, but you can obtain it by running docker-compose ps -a
# run your npm command there, as npm run watch
```

- To send `rs` to nodemon :

```bash
docker attach --detach-keys="ctrl-c" matchmaking_api_1
rs
```
