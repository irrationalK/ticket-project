require('dotenv').config();
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const attorneyRoutes = require('./routes/attorneyRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/attorneys', attorneyRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
