# Veridia Hiring Platform - Full Stack Setup

## 📋 Overview
Complete hiring platform with Node.js backend and vanilla HTML/CSS/JS frontend.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- MongoDB (v4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- VS Code or any code editor

---

## 📁 Project Structure

```
veridia-hiring-platform/
├── backend/
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   └── uploads/            # Resume uploads folder (create this)
│       └── resumes/
└── frontend/
    └── index.html          # Frontend application
```

---

## ⚙️ Backend Setup

### Step 1: Install MongoDB

**For Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run automatically as a service

**For Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

Verify MongoDB is running:
```bash
mongo --version
```

### Step 2: Setup Backend

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- cors (cross-origin requests)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- multer (file uploads)
- dotenv (environment variables)

3. **Create environment file:**
```bash
# Copy the example file
cp .env.example .env

# Or manually create .env file with this content:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/veridia-hiring
JWT_SECRET=your-super-secret-jwt-key-12345
```

4. **Create uploads folder:**
```bash
mkdir -p uploads/resumes
```

5. **Start the backend server:**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📡 API: http://localhost:5000/api
```

---

## 🎨 Frontend Setup

### Step 1: Open Frontend

1. Navigate to the `frontend` folder
2. Open `index.html` in your browser by:
   - Double-clicking the file, OR
   - Right-click → Open with → Your browser, OR
   - Use VS Code Live Server extension

### Step 2: (Optional) Use Live Server in VS Code

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Frontend will open at `http://127.0.0.1:5500`

---

## 🧪 Testing the Application

### Create Admin User (First Time Only)

Use Postman, curl, or any HTTP client:

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

Or use this simple HTML form - create `create-admin.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Create Admin</title>
</head>
<body>
    <h1>Create Admin User</h1>
    <form id="adminForm">
        <input type="text" id="fullName" placeholder="Full Name" required><br>
        <input type="email" id="email" placeholder="Email" required><br>
        <input type="tel" id="phone" placeholder="Phone" required><br>
        <input type="password" id="password" placeholder="Password" required><br>
        <button type="submit">Create Admin</button>
    </form>
    <div id="result"></div>

    <script>
        document.getElementById('adminForm').onsubmit = async (e) => {
            e.preventDefault();
            const response = await fetch('http://localhost:5000/api/admin/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    password: document.getElementById('password').value,
                    adminSecret: 'VERIDIA_ADMIN_SECRET_2026'
                })
            });
            const data = await response.json();
            document.getElementById('result').innerHTML = 
                response.ok ? '✅ Admin created!' : '❌ Error: ' + data.error;
        };
    </script>
</body>
</html>
```

### Test User Flow

1. **Register as Candidate:**
   - Go to frontend (`index.html`)
   - Click "Apply Now"
   - Fill registration form
   - Submit application

2. **Login as Candidate:**
   - Click "Login"
   - Enter candidate email/password
   - View your dashboard

3. **Login as Admin:**
   - Click "Login"
   - Check "Login as Admin/HR"
   - Enter: `admin@veridia.com` / `admin123`
   - View all applications
   - Update application status

---

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
```

### Applications
```
POST   /api/applications         - Submit application (auth required)
GET    /api/applications/:id     - Get application details (auth required)
```

### Candidate Dashboard
```
GET    /api/candidate/dashboard  - Get candidate data (auth required)
```

### Admin Panel
```
GET    /api/admin/stats          - Get statistics (admin only)
GET    /api/admin/applications   - Get all applications (admin only)
PATCH  /api/admin/applications/:id/status  - Update status (admin only)
DELETE /api/admin/applications/:id         - Delete application (admin only)
POST   /api/admin/create         - Create admin user
```

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution:**
- Check if MongoDB is running: `mongod --version`
- Start MongoDB service:
  - Windows: Check Services app
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongodb`

### Problem: "Port 5000 already in use"
**Solution:**
- Change PORT in `.env` file to 5001 or any available port
- Update API_URL in `index.html` to match new port

### Problem: "CORS Error"
**Solution:**
- Make sure backend is running
- Check that `cors` is installed: `npm install cors`
- Verify API_URL in frontend matches backend URL

### Problem: "File upload not working"
**Solution:**
- Make sure `uploads/resumes` folder exists in backend directory
- Check file size (default max: 5MB)
- Verify file type is PDF or DOC

### Problem: "JWT token expired"
**Solution:**
- Tokens expire after 7 days
- Login again to get new token
- Change expiry in server.js: `expiresIn: '30d'`

---

## 📊 Database Structure

### Users Collection
```javascript
{
  fullName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: 'candidate' | 'admin',
  createdAt: Date
}
```

### Applications Collection
```javascript
{
  userId: ObjectId (ref: User),
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  degree: String,
  university: String,
  graduationYear: Number,
  position: String,
  experience: Number,
  skills: String,
  coverLetter: String,
  resumePath: String,
  status: 'Submitted' | 'Under Review' | 'Selected' | 'Rejected',
  appliedDate: Date,
  lastUpdated: Date
}
```

---

## 🔐 Security Notes

### For Production:

1. **Change JWT Secret:**
```env
JWT_SECRET=use-a-long-random-string-here-minimum-32-characters
```

2. **Use Strong Admin Secret:**
```env
ADMIN_SECRET=very-secure-random-string-for-creating-admins
```

3. **Enable HTTPS:**
- Use SSL certificates
- Update CORS settings

4. **Environment Variables:**
- Never commit `.env` file
- Use environment variables for sensitive data

5. **MongoDB Security:**
- Enable authentication
- Use strong passwords
- Restrict network access

---

## 📦 Deployment

### Deploy Backend (Heroku Example)

1. Install Heroku CLI
2. Create `Procfile`:
```
web: node server.js
```

3. Deploy:
```bash
heroku create veridia-hiring-api
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Deploy Frontend (Netlify/Vercel)

1. Update API_URL in `index.html` to your backend URL
2. Deploy via Netlify or Vercel dashboard
3. Drag and drop the `index.html` file

### MongoDB Cloud (MongoDB Atlas)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/veridia
```

---

## 📞 Support

For issues or questions:
- Check troubleshooting section above
- Review API documentation
- Check browser console for errors
- Check backend terminal for error logs

---

## 🎉 Success!

If everything is working:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5500 or local file
- ✅ MongoDB connected
- ✅ Can register users
- ✅ Can submit applications
- ✅ Admin can view all applications

Happy Hiring! 🚀
