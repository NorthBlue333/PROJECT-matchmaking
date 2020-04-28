FROM node

ARG UID
ARG GID
ARG DOCKER_USER
RUN userdel -f -r node
RUN /bin/bash -c '[[ $DOCKER_USER == "root" ]]' || adduser --disabled-password --uid $UID --system --shell /bin/bash $DOCKER_USER
USER $DOCKER_USER

RUN mkdir -p /home/$DOCKER_USER/app

WORKDIR /home/$DOCKER_USER/app

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000

CMD npm i && npm run dev
