#!/bin/bash

PORT=3000

echo "Checking if port $PORT is in use..."

# Find PID using lsof
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
  echo "Port $PORT is already free."
else
  echo "Process $PID is using port $PORT. Killing it..."
  kill -9 $PID
  if [ $? -eq 0 ]; then
    echo "Successfully freed port $PORT."
  else
    echo "Failed to kill process $PID. You might need sudo."
  fi
fi
