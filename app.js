import express from 'express';
import path from 'path';
import indexRouter from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mimeTypes from 'mime-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use middleware and routers
app.use('/', indexRouter);

app.use(function(req, res, next) {
  const mimeType = mimeTypes.lookup(req.path.split('/').pop());
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});