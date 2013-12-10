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

  // TODO: save comment
  next()
}
