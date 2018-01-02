#!/bin/sh
set -e

docker login --username=_ --password=$HEROKU_AUTH_TOKEN registry.heroku.com
docker push registry.heroku.com/$HEROKU_APP_NAME/web
