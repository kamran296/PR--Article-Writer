const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/profileDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the user profile
const profileSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  role: String,
  department: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// API endpoint to update profile
app.post('/api/updateProfile', async (req, res) => {
  const { userId, role, department } = req.body;
  try {
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId, role, department });
    } else {
      profile.role = role;
      profile.department = department;
    }
    await profile.save();
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    res.status(500).send('Error updating profile');
  }
});

// API endpoint to get profile
app.get('/api/getProfile/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ userId });
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).send('Profile not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching profile');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});