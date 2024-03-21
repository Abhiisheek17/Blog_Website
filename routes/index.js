import express from 'express';

const router = express.Router();

// Mock data for posts
let posts = [
  { id: 1, title: 'Post 1', content: 'This is the first post.' },
  { id: 2, title: 'Post 2', content: 'This is the second post.' },
];

// Home page route
router.get('/', (req, res) => {
  res.render('index', { posts });
});

// Create new post route
router.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.redirect('/');
});

// Edit post route
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return res.redirect('/');
  }
  res.render('edit', { post });
});

// Update post route
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  if (postIndex === -1) {
    return res.redirect('/');
  }
  posts[postIndex] = {
    id: parseInt(id),
    title,
    content,
  };
  res.redirect('/');
});

// Delete post route
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== parseInt(id));
  res.redirect('/');
});

export default router;