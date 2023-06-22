const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');

// Load env vars

dotenv.config({ path: './config/config.env' });

// connect database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

//static connect
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:5000/`)
);
