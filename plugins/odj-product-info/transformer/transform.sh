#!/bin/bash

# Expects arguments: [ORG] [PRODUCT] [ENV]
args=("$@")
ORG=${args[0]}
PRODUCT=${args[1]}
ENV=${args[2]}

docker run --rm -it --name transform-odj -v "$PWD":/usr/src/app -w /usr/src/app node:12-alpine npm --silent run build "$ORG" "$PRODUCT" "$ENV"
