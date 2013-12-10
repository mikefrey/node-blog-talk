var Post = require('../models/post')
var Comment = require('../models/comment')

function formatDate(date) {
  return date.toDateString() + ' ' + date.toTimeString().substring(0,5)
}

/*
 * GET post
 */

exports.show = function(req, res) {
  // fetch the post
  var key = req.params.key
  Post.get(key, function(err, post) {
    if (err) return res.render('error/500')
    if (!post) return res.render('error/404')

    Comment.list(key, function(err, comments) {
      res.render('post', { post:post, comments:comments||[] })
    })
  })
}


/*
 * POST post
 */

exports.comment = function(req, res, next) {
  var key = req.params.key + '!' + Math.floor(Math.random() * 10000)
  var comment = new Comment(key)

  comment.author = req.body.author
  comment.body = req.body.body
  comment.date = formatDate(new Date())

  comment.save(function(err) {
    if (err) return res.render('500')
    next()
  })
}
