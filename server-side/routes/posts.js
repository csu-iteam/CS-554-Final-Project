const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const imageData=data.images;

//Show the single post with id   (done)
router.get('/:id', async (req, res) => {
  try {
    const post = await postData.getPostById(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
  }
});

//show the list of posts with tag  (done)
router.get('/tag/:tag', async (req, res) => {
  const postList = await postData.getPostsByTag(req.params.tag);
  res.json(postList);
});

//show all of the posts  (done)
router.get('/', async (req, res) => {
  try {
    const postList = await postData.getAllPosts();
    res.json(postList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//show all of the posts by username (done)
router.get('/getpostbyuser/:username', async(req, res) =>{
  try{
    const postList = await postData.getPostsByUser(req.params.username);
    
    res.json(postList);
  }catch(e){
    res.status(500).json({error: e});
  }
});

//  get post by email  (done)
router.get('/getpostbyuseremail/:currentEmail', async(req, res) =>{
  try{
    const postList = await postData.getPostsByUserEmail(req.params.currentEmail);
    
    res.json(postList);
  }catch(e){
    res.status(500).json({error: e});
  }
});

// make a new posts by email of user,
// "useremail": currentEmail.value,
// "tag": tag.value,
// "title": title.value,
// "discription": discription.value,
// "price": price.value
router.post('/makenewpostbyemail', async (req, res) =>{
  const blogPostData = req.body;
  if (!blogPostData.title) {
    res.status(400).json({ error: 'You must provide blog post title' });
    return;
  }
  if (!blogPostData.tag) {
    res.status(400).json({ error: 'You must provide blog post tag' });
    return;
  }
  if (!blogPostData.useremail) {
    res.status(400).json({ error: 'You must provide poster userId' });
    return;
  }
  if (!blogPostData.discription) {
    res.status(400).json({ error: 'You must provide poster discription' });
    return;
  }
  if (!blogPostData.price) {
    res.status(400).json({ error: 'You must provide poster price' });
    return;
  }
  if (!blogPostData.imgbase64head) {
    res.status(400).json({ error: 'You must provide poster img' });
    return;
  }
  try {
    const { useremail, tag, title, discription, price,imgbase64head} = blogPostData;
    const imageId=await imageData.insertImage(imgbase64head);
    const imageArray=[imageId]
    const newPost = await postData.addPostByUserEmail(useremail, tag, title, discription,imageArray, price);
    res.status(200).json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// make a new posts by id,  (done)
router.post('/', async (req, res) => {
  const blogPostData = req.body;
  if (!blogPostData.title) {
    res.status(400).json({ error: 'You must provide blog post title' });
    return;
  }
  if (!blogPostData.tag) {
    res.status(400).json({ error: 'You must provide blog post tag' });
    return;
  }
  if (!blogPostData.userId) {
    res.status(400).json({ error: 'You must provide poster userId' });
    return;
  }
  if (!blogPostData.discription) {
    res.status(400).json({ error: 'You must provide poster discription' });
    return;
  }
  if (!blogPostData.imgbase64head) {
    res.status(400).json({ error: 'You must provide poster img' });
    return;
  }
  if (!blogPostData.price) {
    res.status(400).json({ error: 'You must provide poster price' });
    return;
  }
  try {
    const { userId, tag, title, discription, price, imgbase64head } = blogPostData;
    const imageId=await imageData.insertImage(imgbase64head);
    const imageArray=[imageId]
    const newPost = await postData.addPost(userId, tag, title, discription, imageArray, price);
    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});



router.put('/:id', async (req, res) => {
  const updatedData = req.body;
  if (!updatedData.title || !updatedData.body || !updatedData.posterId) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  try {
    const updatedPost = await postData.updatePost(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch('/:id', async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    const oldPost = await postData.getPostById(req.params.id);
    if (requestBody.title && requestBody.title !== oldPost.title)
      updatedObject.title = requestBody.title;
    if (requestBody.body && requestBody.body !== oldPost.body)
      updatedObject.body = requestBody.body;
    if (requestBody.tags && requestBody.tags !== oldPost.tags)
      updatedObject.tags = requestBody.tags;
    if (requestBody.posterId && requestBody.posterId !== oldPost.posterId)
      updatedObject.posterId = requestBody.posterId;
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  if (Object.keys(updatedObject).length !== 0) {
    try {
      const updatedPost = await postData.updatePost(
        req.params.id,
        updatedObject
      );
      res.json(updatedPost);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res
      .status(400)
      .json({
        error:
          'No fields have been changed from their inital values, so no update has occurred'
      });
  }
});

//(done)
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply and ID to delete' });
    return;
  }
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  try {
    await postData.removePost(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
