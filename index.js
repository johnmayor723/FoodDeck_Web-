const express = require('express');
const path = require('path');
const session = require("express-session")
//const expressLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup for handling sessions
app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,              // Prevents session from being saved back to the store if not modified
  saveUninitialized: false,    // Prevents uninitialized sessions from being saved
  cookie: {                    // Cookie options
    maxAge: 24 * 60 * 60 * 1000, // 1 day (optional, based on your needs)
    secure: false               // Use `true` if you're using HTTPS
  }
}));

// Use express-ejs-layouts
//app.use(expressLayouts);
//app.set('layout', 'layout'); // Define the default layout file

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
