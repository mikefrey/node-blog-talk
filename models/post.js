var db = require('./db')

// create a posts sublevel
var posts = db.sublevel('posts')

function makeKey(str) {
  return str.replace(/\s/g, '_').replace(/[^\w\d\-]/g, '').toLowerCase()
}

var Post = module.exports = function(key, attrs) {
  this.key = key

  if (attrs) {
    this.title = attrs.title
    this.date = attrs.date
    this.body = attrs.body
  }
}

Post.prototype.save = function(callback) {
  this.key = this.key || makeKey(this.title)
  posts.put(this.key, {
    title: this.title,
    date: this.date,
    body: this.body
  }, callback)
}

Post.get = function(key, callback) {
  posts.get(key, function(err, value) {
    if (err && err.notFound) return callback()
    if (err) return callback(err)

    callback(null, new Post(key, value))
  })
}

Post.del = function(key, callback) {
  posts.del(key, function(err) {
    if (err) return callback(err)
    callback(null)
  })
}

Post.list = function(options, callback) {
  var results = []

  options.reverse = !options.reverse

  posts.createReadStream(options)
    .on('data', function(data) {
      results.push(new Post(data.key, data.value))
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
