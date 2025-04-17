const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const employerRoutes = require('./routes/employer.routes');
const managerRoutes = require('./routes/manager.routes');


dotenv.config();  // Charge les variables d'environnement depuis .env

connectDB();  // Connexion à la base de données MongoDB

const app = express();
app.use(express.json());  // Pour parser les requêtes JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/manager', managerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
