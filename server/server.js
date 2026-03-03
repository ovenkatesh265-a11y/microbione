import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        if (MONGODB_URI && MONGODB_URI !== 'YOUR_MONGODB_CONNECTION_STRING_HERE') {
            console.log('⏳ Attempting to connect to MongoDB Atlas...');
            await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
            console.log('✅ Connected to MongoDB Atlas successfully!');
            return;
        } else {
            console.error('❌ MONGODB_URI is not defined in environment variables.');
        }
    } catch (err) {
        console.error('❌ MongoDB Atlas connection failed.', err);
    }
};

connectDB();

// Define Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    rating: { type: String, required: true },
    suggestions: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Define Visitor Schema and Model
const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// API Routes
app.post('/api/feedback', async (req, res) => {
    try {
        const { name, age, rating, suggestions } = req.body;

        // Check if connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: "Database not connected. Did you set MONGODB_URI?" });
        }

        const newFeedback = new Feedback({ name, age, rating, suggestions });
        const savedFeedback = await newFeedback.save();

        res.status(201).json({ message: 'Feedback saved successfully', data: savedFeedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Failed to save feedback', details: error.message });
    }
});

app.get('/api/feedback', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: "Database not connected." });
        }

        // Fetch all feedback sorted by newest first
        const feedbackData = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({ data: feedbackData });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Failed to fetch feedback', details: error.message });
    }
});

// Visit Tracking Routes
app.post('/api/visit', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });

        let visitRecord = await Visitor.findOne();
        if (!visitRecord) {
            visitRecord = new Visitor({ count: 1 });
        } else {
            visitRecord.count += 1;
        }
        await visitRecord.save();
        res.status(200).json({ success: true, count: visitRecord.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record visit' });
    }
});

app.get('/api/visits', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });

        const visitRecord = await Visitor.findOne();
        res.status(200).json({ count: visitRecord ? visitRecord.count : 0 });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch visits' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
