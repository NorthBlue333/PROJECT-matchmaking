FROM node

ARG UID
ARG GID
RUN userdel -f -r node
RUN adduser --disabled-password --uid $UID --system --shell /bin/bash workspace
USER workspace

RUN mkdir -p /home/workspace/app

WORKDIR /home/workspace/app

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000

CMD npm install && npm run start
