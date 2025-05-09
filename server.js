const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const employerRoutes = require('./routes/employer.routes');
const managerRoutes = require('./routes/manager.routes');
const leadRoutes = require('./routes/lead.routes');
const cors = require("cors");

dotenv.config();  // Charge les variables d'environnement depuis .env

connectDB();  // Connexion à la base de données MongoDB




const app = express();
app.use(express.json());  // Pour parser les requêtes JSON
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // permet d'envoyer les cookies ou les headers personnalisés
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api', leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
