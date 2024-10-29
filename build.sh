#!/bin/bash

echo "Installing dependencies..."
npm install clsx --force

echo "Running SvelteKit build..."
npm run build