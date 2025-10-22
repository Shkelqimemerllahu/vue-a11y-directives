#!/bin/bash

# Vue A11y Directives - Quick Start Script
# This script installs all dependencies and starts the documentation site

echo "🎯 Vue A11y Directives - Quick Start"
echo "====================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the vue-a11y-directives directory"
    exit 1
fi

echo "📦 Installing root dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install root dependencies"
    exit 1
fi

echo "✅ Root dependencies installed"
echo ""

echo "📚 Installing documentation dependencies..."
cd docs
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install documentation dependencies"
    exit 1
fi

echo "✅ Documentation dependencies installed"
echo ""

echo "🚀 Starting documentation site..."
echo "   Opening http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
