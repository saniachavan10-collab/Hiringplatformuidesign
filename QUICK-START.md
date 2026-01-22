# 🎉 COMPLETE PACKAGE - VERIDIA HIRING PLATFORM

## ✅ What You've Received

### 📂 Complete File Structure

```
veridia-hiring-platform/
│
├── 📄 README.md                    # Complete setup instructions
├── 📄 setup.sh                     # Quick setup script (Mac/Linux)
├── 📄 setup.bat                    # Quick setup script (Windows)
├── 📄 create-admin.html            # Create admin user interface
├── 📄 test-api.html                # API testing interface
│
├── backend/                        # Backend API Server
│   ├── server.js                   # Main server file (Node.js + Express)
│   ├── package.json                # Backend dependencies
│   ├── .env.example                # Environment variables template
│   └── uploads/                    # File uploads folder (create this)
│       └── resumes/
│
└── frontend/                       # Frontend Application
    └── index.html                  # Complete frontend app (HTML/CSS/JS)
```

---

## 🚀 QUICK START (3 Steps)

### Option 1: Automatic Setup (Recommended)

**For Windows:**
```bash
# Double-click setup.bat
# OR run in Command Prompt:
setup.bat
```

**For Mac/Linux:**
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Option 2: Manual Setup

**Step 1: Install MongoDB**
- Download: https://www.mongodb.com/try/download/community
- Install and start the service

**Step 2: Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/veridia-hiring
JWT_SECRET=your-secret-key-change-in-production
```

Create uploads folder:
```bash
mkdir -p uploads/resumes
```

**Step 3: Start Backend**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

---

## 🎯 USAGE GUIDE

### 1️⃣ Create Admin User

**Option A:** Open `create-admin.html` in browser
- Fill in admin details
- Click "Create Admin Account"
- Done!

**Option B:** Use curl
```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Admin User",
    "email": "admin@veridia.com",
    "phone": "+1234567890",
    "password": "admin123",
    "adminSecret": "VERIDIA_ADMIN_SECRET_2026"
  }'
```

### 2️⃣ Test the API (Optional)

Open `test-api.html` in browser:
- Click "Run All Tests"
- Verify all tests pass ✅
- Troubleshoot if any fail ❌

### 3️⃣ Use the Application

Open `frontend/index.html` in browser:

**As Candidate:**
1. Click "Apply Now"
2. Register with your details
3. Fill application form
4. Submit
5. Login to view status

**As Admin:**
1. Click "Login"
2. Check "Login as Admin/HR"
3. Enter admin credentials
4. View all applications
5. Update application status

---

## 🔧 COMPLETE FEATURE LIST

### ✨ Frontend Features
- ✅ Modern, responsive design
- ✅ Landing page with hero section
- ✅ User registration & login
- ✅ Multi-step application form with progress bar
- ✅ File upload for resumes
- ✅ Candidate dashboard with application tracking
- ✅ Admin dashboard with all applications
- ✅ Status management system
- ✅ Real-time API integration
- ✅ JWT authentication
- ✅ Error handling & loading states

### 🎨 Design Features
- ✅ Deep green/teal color scheme
- ✅ Soft blue accents
- ✅ Rounded cards with shadows
- ✅ Smooth animations & transitions
- ✅ Mobile responsive
- ✅ Professional typography
- ✅ Accessible forms

### 🔌 Backend Features (API)
- ✅ RESTful API architecture
- ✅ User authentication (JWT)
- ✅ Password hashing (bcrypt)
- ✅ File upload system
- ✅ MongoDB database
- ✅ Role-based access (Admin/Candidate)
- ✅ CORS enabled
- ✅ Error handling
- ✅ Input validation

### 📊 Database
- ✅ User management
- ✅ Application storage
- ✅ Status tracking
- ✅ File path storage
- ✅ Timestamps

---

## 📡 API ENDPOINTS

### Authentication
```
POST /api/auth/register          Register new user
POST /api/auth/login             Login user
```

### Applications (Authenticated)
```
POST /api/applications           Submit application
GET  /api/candidate/dashboard    Get candidate data
```

### Admin Only
```
GET    /api/admin/stats                        Get statistics
GET    /api/admin/applications                 Get all applications
PATCH  /api/admin/applications/:id/status      Update status
DELETE /api/admin/applications/:id             Delete application
POST   /api/admin/create                       Create admin user
```

---

## 🔐 DEFAULT CREDENTIALS

**After creating admin with the scripts:**
- Email: `admin@veridia.com`
- Password: `admin123`
- Role: Admin/HR

**Test Candidate:**
- Register through the application
- Any email/password you choose

---

## 🐛 TROUBLESHOOTING

### Backend won't start
```bash
# Check if MongoDB is running
mongod --version

# Check if port 5000 is available
# Change PORT in .env if needed
```

### Can't connect to backend
```bash
# Verify backend is running
# Check http://localhost:5000/api/health

# Check for CORS errors in browser console
# Ensure API_URL in index.html matches backend
```

### MongoDB connection error
```bash
# Windows: Check Services for MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/veridia-hiring
```

### File upload not working
```bash
# Create uploads directory
mkdir -p backend/uploads/resumes

# Check file size (max 5MB by default)
# Check file type (.pdf, .doc, .docx only)
```

---

## 📦 DEPENDENCIES

### Backend (Auto-installed with npm install)
```json
{
  "express": "^4.18.2",        // Web framework
  "mongoose": "^7.6.3",        // MongoDB ODM
  "cors": "^2.8.5",            // Cross-origin requests
  "bcryptjs": "^2.4.3",        // Password hashing
  "jsonwebtoken": "^9.0.2",   // JWT authentication
  "multer": "^1.4.5-lts.1",   // File uploads
  "dotenv": "^16.3.1"         // Environment variables
}
```

### Frontend
- No dependencies! Pure HTML/CSS/JavaScript

---

## 🌐 DEPLOYMENT READY

### Backend Deployment (Heroku)
```bash
# Add to backend folder
echo "web: node server.js" > Procfile

# Deploy
heroku create veridia-api
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-production-secret
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
1. Update API_URL in `index.html` to production backend URL
2. Upload `index.html` to Netlify or Vercel
3. Done!

### Database (MongoDB Atlas)
1. Create free cluster at https://cloud.mongodb.com
2. Get connection string
3. Update MONGODB_URI in `.env` or Heroku config

---

## 💡 CUSTOMIZATION

### Change Colors
Edit CSS in `index.html`:
```css
/* Primary green/teal */
background: linear-gradient(to right, #047857, #0d9488);

/* Replace with your brand colors */
background: linear-gradient(to right, #YOUR_COLOR_1, #YOUR_COLOR_2);
```

### Add Email Notifications
Install nodemailer:
```bash
npm install nodemailer
```

Add to `server.js`:
```javascript
const nodemailer = require('nodemailer');
// Configure and send emails on status updates
```

### Add More Fields
1. Update Application schema in `server.js`
2. Add form fields in `index.html`
3. Update submission handler

---

## 📞 SUPPORT FILES INCLUDED

1. **README.md** - Complete documentation
2. **setup.sh / setup.bat** - Automated setup
3. **create-admin.html** - GUI for creating admin
4. **test-api.html** - API testing interface
5. **.env.example** - Environment template

---

## ✅ VERIFICATION CHECKLIST

Before going live, verify:

- [ ] MongoDB is installed and running
- [ ] Backend server starts without errors
- [ ] Frontend opens in browser
- [ ] Can create admin user
- [ ] Can register as candidate
- [ ] Can submit application
- [ ] Admin can view applications
- [ ] Admin can update status
- [ ] All API tests pass

---

## 🎓 LEARNING RESOURCES

- **Node.js**: https://nodejs.org/docs
- **Express**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **JWT**: https://jwt.io/introduction

---

## 🚀 YOU'RE ALL SET!

Everything is ready to use. Follow the Quick Start section and you'll be running in minutes!

### Next Steps:
1. Run setup script OR manually install
2. Start backend: `cd backend && npm start`
3. Create admin: Open `create-admin.html`
4. Test API: Open `test-api.html`
5. Use app: Open `frontend/index.html`

---

## 📄 LICENSE

This is a complete, production-ready hiring platform. You can use it freely for your projects!

---

**Questions?** Check the README.md file for detailed troubleshooting!

**Happy Hiring! 🎉**
