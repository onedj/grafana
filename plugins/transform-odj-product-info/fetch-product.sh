#!/bin/bash

ORGANISATION='ce'  # $1
PRODUCT='ratings'  # $2

API_HOST='http://core.live.odjint.schwarz'
creds='odjcore:9vwvaymEwAfKBmya'

BASE_DIR="./data/snapshot/products/$ORGANISATION/$PRODUCT"

function fetch_product() {
  echo "Fetch product '$PRODUCT'..."
  local DIR="$BASE_DIR"
  mkdir -p $BASE_DIR
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT} -o $DIR/${PRODUCT}.json
  # metrics in a sense of how often a product was deployed and whats its current status look like
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/metrics -o $DIR/metrics.json
}

function fetch_infra() {
  local INFRA=$1

  echo "Fetch infra '$INFRA'..."
  local DIR="$BASE_DIR/infras"
  mkdir -p $DIR
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/infras/${INFRA} -o $DIR/${INFRA}.json
  # Fetch status
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/infras/${INFRA}/status -o $DIR/${INFRA}.status
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/infras/${INFRA}/status.svg -o $DIR/${INFRA}.svg
  # Details from latest run
  curl -s -L -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/infras/${INFRA}/history/latest -o $DIR/${INFRA}.latest-run
}


function fetch_stage() {
  local STAGE=$1

  echo "Fetch stage '$STAGE'..."
  local DIR="$BASE_DIR/stages"
  mkdir -p $DIR
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/stages/${STAGE} -o $DIR/${STAGE}.json
  # Fetch status
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/stages/${STAGE}/status -o $DIR/${STAGE}.status
  curl -s -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/stages/${STAGE}/status.svg -o $DIR/${STAGE}.svg
  # Details from latest run
  curl -s -L -u $creds $API_HOST/api/orgs/${ORGANISATION}/products/${PRODUCT}/stages/${STAGE}/history/latest -o $DIR/${STAGE}.latest-run
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
