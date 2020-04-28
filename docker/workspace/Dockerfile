FROM node

ARG UID
ARG GID
ARG USER
RUN userdel -f -r node
RUN /bin/bash -c '[[ $USER == "root" ]]' || adduser --disabled-password --uid $UID --system --shell /bin/bash $USER
USER $USER

RUN mkdir -p /home/$USER/app

WORKDIR /home/$USER/app

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000

CMD npm install && npm run start
