# Project Matchmaking (development)

## environment

Using docker :

- Copy `docker/.env.example` into `docker/.env`
- Run command `id`
- Edit `docker/.env` and add your `GID and `UID`
- If you are on Windows :
  - `UID` and `GID` vars are ignored, but you can set it to `0`
  - Set var `DOCKER_USER` to `root` and `DOCKER_COMMAND` to `dev-l`
- Run command `docker-compose up` inside `docker`
- To shutdown press `CTRL+C` and then run `docker-compose down`
- To rebuild image run `docker-compose up --build`
- To run npm commands :
```
docker exec -it {name} bash # {name} should be matchmaking_api_1, but you can obtain it by running docker-compose ps -a
# run your npm command there, as npm run watch
```
- To send `rs` to nodemon :
```
docker attach --detach-keys="ctrl-c" matchmaking_api_1
rs
```
