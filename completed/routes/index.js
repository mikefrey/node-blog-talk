var Post = require('../models/post')

/*
 * GET home page.
 */

exports.index = function(req, res) {
  // fetch the last 5 posts
  Post.list({ limit:5 }, function(err, posts) {
    if (err) return res.render('error/500')
    posts = posts || []
    res.render('index', { posts:posts })
  })
}
