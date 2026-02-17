#!/usr/bin/env bash
BASE_URL="http://localhost:3000"
TOKEN="devtesttoekenwillgohere"

health() {
  echo "   Probing endpoint /health ..."
    xh GET -vv "$BASE_URL/health"
}

jobs() {
  echo "🔍 Probing Jobs Valve..."
    xh GET "$BASE_URL/jobs" \
    Authorization:"Bearer $TOKEN"
}

case "$1" in
  health) health ;;
  jobs)   jobs ;;
  *)      echo "Usage: $0 {health|jobs}" ;;
esac
