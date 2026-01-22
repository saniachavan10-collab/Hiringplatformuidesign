const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/veridia-hiring';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// File Upload Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resumes/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Only PDF and DOC files are allowed!'));
    }
});

// Database Models
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['candidate', 'admin'], default: 'candidate' },
    createdAt: { type: Date, default: Date.now }
});

const ApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Personal Details
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: String,
    // Education
    degree: { type: String, required: true },
    university: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    gpa: String,
    // Experience
    position: { type: String, required: true },
    experience: { type: Number, required: true },
    skills: { type: String, required: true },
    linkedinUrl: String,
    portfolioUrl: String,
    // Documents
    coverLetter: { type: String, required: true },
    resumePath: { type: String, required: true },
    // Status
    status: { 
        type: String, 
        enum: ['Submitted', 'Under Review', 'Selected', 'Rejected'],
        default: 'Submitted'
    },
    appliedDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Application = mongoose.model('Application', ApplicationSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Check if admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// ============= API ROUTES =============

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Veridia Hiring Platform API' });
});

// Register User
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: 'candidate'
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if role matches
        if (isAdmin && user.role !== 'admin') {
            return res.status(401).json({ error: 'Invalid admin credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Submit Application
app.post('/api/applications', authenticateToken, upload.single('resume'), async (req, res) => {
    try {
        const applicationData = {
            userId: req.user.userId,
            ...req.body,
            resumePath: req.file ? req.file.path : null,
            status: 'Submitted',
            appliedDate: new Date()
        };

        const application = new Application(applicationData);
        await application.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            application: {
                id: application._id,
                status: application.status,
                appliedDate: application.appliedDate
            }
        });
    } catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ error: 'Application submission failed' });
    }
});

// Get Candidate Dashboard Data
app.get('/api/candidate/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        const applications = await Application.find({ userId: req.user.userId })
            .sort({ appliedDate: -1 });

        res.json({
            user: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            },
            applications: applications.map(app => ({
                id: app._id,
                position: app.position,
                status: app.status,
                appliedDate: app.appliedDate,
                department: 'Engineering' // You can make this dynamic
            })),
            stats: {
                totalApplications: applications.length,
                underReview: applications.filter(app => app.status === 'Under Review').length,
                selected: applications.filter(app => app.status === 'Selected').length
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
});

// Get Single Application Details
app.get('/api/applications/:id', authenticateToken, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Check if user owns this application or is admin
        if (application.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(application);
    } catch (error) {
        console.error('Application fetch error:', error);
        res.status(500).json({ error: 'Failed to load application' });
    }
});

// ============= ADMIN ROUTES =============

// Get All Applications (Admin)
app.get('/api/admin/applications', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { status, search, page = 1, limit = 10 } = req.query;
        
        let query = {};
        
        // Filter by status
        if (status && status !== 'all') {
            query.status = status;
        }
        
        // Search functionality
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }

        const applications = await Application.find(query)
            .populate('userId', 'fullName email')
            .sort({ appliedDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Application.countDocuments(query);

        res.json({
            applications: applications.map(app => ({
                id: app._id,
                candidateName: `${app.firstName} ${app.lastName}`,
                email: app.email,
                phone: app.phone,
                position: app.position,
                skills: app.skills,
                experience: app.experience,
                status: app.status,
                appliedDate: app.appliedDate,
                resumePath: app.resumePath
            })),
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalApplications: count
        });
    } catch (error) {
        console.error('Admin applications fetch error:', error);
        res.status(500).json({ error: 'Failed to load applications' });
    }
});

// Update Application Status (Admin)
app.patch('/api/admin/applications/:id/status', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['Submitted', 'Under Review', 'Selected', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status, lastUpdated: new Date() },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json({
            message: 'Status updated successfully',
            application: {
                id: application._id,
                status: application.status
            }
        });
    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Get Admin Dashboard Statistics
app.get('/api/admin/stats', authenticateToken, isAdmin, async (req, res) => {
    try {
        const totalApplications = await Application.countDocuments();
        const submitted = await Application.countDocuments({ status: 'Submitted' });
        const underReview = await Application.countDocuments({ status: 'Under Review' });
        const selected = await Application.countDocuments({ status: 'Selected' });
        const rejected = await Application.countDocuments({ status: 'Rejected' });

        res.json({
            totalApplications,
            submitted,
            underReview,
            selected,
            rejected
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to load statistics' });
    }
});

// Delete Application (Admin)
app.delete('/api/admin/applications/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

// Create Admin User (Run once to create first admin)
app.post('/api/admin/create', async (req, res) => {
    try {
        const { fullName, email, phone, password, adminSecret } = req.body;

        // Check admin secret (you should use environment variable)
        if (adminSecret !== 'VERIDIA_ADMIN_SECRET_2026') {
            return res.status(403).json({ error: 'Invalid admin secret' });
        }

        // Check if admin exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();

        res.status(201).json({
            message: 'Admin user created successfully',
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({ error: 'Admin creation failed' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
});
