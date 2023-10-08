const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const attorneyRoutes = require('./routes/attorneyRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/attorneys', attorneyRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});