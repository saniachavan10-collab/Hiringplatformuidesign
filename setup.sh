#!/bin/bash

echo "🚀 Veridia Hiring Platform - Quick Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed ($(node --version))"

# Check if MongoDB is running
if ! command -v mongo &> /dev/null && ! command -v mongod &> /dev/null
then
    echo "⚠️  MongoDB might not be installed"
    echo "Please install MongoDB from: https://www.mongodb.com/try/download/community"
fi

echo ""
echo "📦 Setting up Backend..."
echo ""

# Navigate to backend directory
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/veridia-hiring
JWT_SECRET=veridia-secret-key-change-in-production-$(date +%s)
ADMIN_SECRET=VERIDIA_ADMIN_SECRET_2026
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Create uploads directory
echo "Creating uploads directory..."
mkdir -p uploads/resumes
echo "✅ Uploads directory created"

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Start MongoDB (if not running):"
echo "   - Windows: MongoDB should auto-start"
echo "   - Mac: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongodb"
echo ""
echo "2. Start the backend server:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "3. Open frontend/index.html in your browser"
echo ""
echo "4. Create an admin user using the API or the provided script"
echo ""
echo "📚 For detailed instructions, see README.md"
echo ""
echo "Happy Hiring! 🎉"
