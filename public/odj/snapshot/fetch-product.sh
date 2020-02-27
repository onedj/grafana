#!/bin/bash

ORGANISATION='ce'  # $1
PRODUCT='ratings'  # $2

API_HOST='http://core.live.odjint.schwarz'
creds='odjcore:9vwvaymEwAfKBmya'


function fetch_product() {
  echo "Fetch product '$PRODUCT'..."
  local BASEDIR="products/$ORGANISATION/$PRODUCT"
  mkdir -p $BASEDIR
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT} -o $BASEDIR/${PRODUCT}.json
}

function fetch_infra() {
  local INFRA=$1

  echo "Fetch infra '$INFRA'..."
  local BASEDIR="products/$ORGANISATION/$PRODUCT/infras"
  mkdir -p $BASEDIR
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/infras/${INFRA} -o $BASEDIR/${INFRA}.json
}


function fetch_stage() {
  local STAGE=$1

  echo "Fetch stage '$STAGE'..."
  local BASEDIR="products/$ORGANISATION/$PRODUCT/stages"
  mkdir -p $BASEDIR
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/stages/${STAGE} -o $BASEDIR/${STAGE}.json
  # TODO: also fetch status of this stage? ../status
}


fetch_product
# ~~
fetch_infra 'live'
fetch_stage 'prod'

# ~~
fetch_infra 'work'
for stage in test dev qa; do
  fetch_stage $stage
done
