#!/bin/sh
YELLOW='\033[1;33m';CYAN='\033[0;36m';GREEN='\033[0;32m';RED='\033[0;31m';NC='\033[0m' # No Color

clear

if [ ! -f .env.local ]; then
  echo;echo;
  printf "Enter your ${CYAN}https://zeit.co/now JSON server endpoint${NC}, followed by [ENTER]:"
  read APIKEY
  if [ -z "$APIKEY" ]
  then
    echo
    printf "${RED}Google api key is unset${NC}. Please try ${GREEN}npm start${NC} or ${GREEN}yarn start${NC} again"
    echo;echo;echo;
  else
    touch .env.local
    FMT_APIKEY="$(echo "${APIKEY}" | tr -d '[:space:]')"
    # sed -i '' "s/YOUR_API_KEY/$APIKEY/g" public/index.html
    echo "REACT_APP_NOW_URL=${FMT_APIKEY}" > .env.local
    yarn start:scripts
  fi
else
  yarn start:scripts
fi