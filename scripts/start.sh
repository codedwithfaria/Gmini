#!/bin/bash

# Build and start the Firefox container
docker-compose up --build -d

# Wait for container to be ready
echo "Waiting for Firefox container to be ready..."
sleep 5

# Print access URLs
echo "Firefox GUI is available at:"
echo "Web UI: http://localhost:5800"
echo "VNC: localhost:5900"