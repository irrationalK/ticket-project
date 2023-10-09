require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const attorneyRoutes = require('./routes/attorneyRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attorneys', attorneyRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
