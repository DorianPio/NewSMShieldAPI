#!/bin/bash

# Start the server
npm run documentation > server.log 2>&1 &
server_pid=$!

# Print the server PID
echo "Generation of the documentation on the PID: $server_pid"

# Set the time to run the server (in seconds)
duration=3

# Wait for the specified duration
sleep $duration

# Kill the server process
kill -15 $server_pid

echo "Generation success"

echo "Documentation loading"

rm -rf DocumentationLoader/public/documentation/data*

mv documentation/*.json DocumentationLoader/public/documentation

echo "Documentation Loaded - Wait for running"

cd DocumentationLoader && npm install && npm run start