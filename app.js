const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const attorneyRoutes = require('./routes/attorneys');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/attorneys', attorneyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});