var db = require('./db')

// create a comments sublevel
var comments = db.sublevel('comments')

var Comment = module.exports = function(key, attrs) {
  this.key = key

  if (attrs) {
    this.author = attrs.author
    this.date = attrs.date
    this.body = attrs.body
  }
}

Comment.prototype.save = function(callback) {
  var key = this.key || this.author.replace(/\s/g, '_').replace(/[\W\D\-]/g, '')
  comments.put(key, {
    author: this.author,
    date: this.date,
    body: this.body
  }, callback)
}

Comment.get = function(key, callback) {
  comments.get(key, function(err, value) {
    if (err && err.notFound) return callback()
    if (err) return callback(err)

    callback(null, new Comment(key, value))
  })
}

Comment.list = function(postKey, callback) {
  var results = []
  var options = {
    start: postKey + '!',
    end: postKey + '!\xff'
  }

  comments.createReadStream(options)
    .on('data', function(data) {
      results.push(new Comment(data.key, data.value))
    })
    .on('error', function(err) {
      if (callback)
        callback(err)
      callback = null
    })
    .on('end', function() {
      if (callback)
        callback(null, results)
      callback = null
    })
}
