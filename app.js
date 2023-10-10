require('dotenv').config();
const express = require('express');
// Upload test
const upload = require('./middleware/multerStorage');
const uploadController = require('./controllers/fileController');
//
const app = express();

app.use(express.json());

// routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const attorneyRoutes = require('./routes/attorneyRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

//const fileRoutes = require('./routes/fileRoutes');

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attorneys', attorneyRoutes);
app.use('/api/tickets', ticketRoutes);

// Upload test
app.use(express.static('public'));
app.post('/upload', upload.single('file'), uploadController.uploadFile);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
