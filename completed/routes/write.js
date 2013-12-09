var Post = require('../models/post')

/*
 * GET write
 */

exports.show = function(req, res) {
  // fetch the post
  var key = req.params.key
  if (!key) // new post
    return res.render('write', { post:{} })

  Post.get(key, function(err, post) {
    if (err) return res.render('error/500')
    if (!post) return res.render('error/404')
    res.render('write', { post:post })
  })
}


/*
 * POST write
 */

exports.save = function(req, res, next) {
  var key = req.params.key || null
  var post = new Post(key)

  var date = new Date()

  post.title = req.body.title
  post.body = req.body.body
  post.date = date.toDateString() + ' ' + date.toTimeString().substring(0,5)

  post.save(function(err) {
    if (err) return res.render('500')
    res.redirect('/posts/' + post.key)
  })
}


/*
 * DELETE write
 */

exports.destroy = function(req, res, next) {
  var key = req.params.key
  if (!key) return next()

  Post.del(key, function() {
    res.redirect('/')
  })
}

