#!/usr/bin/env bash

isError=0

runScript() {
  for i in "$@"; do
    echo "Start $i lint:"
    npm run --silent lint-$i || isError=$?
    echo "Done $i lint."
  done
}

runScript "scss" "js"

exit $isError
