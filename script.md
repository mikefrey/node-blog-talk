#### Generating an app with the express cli

```bash
$ express --ejs --css stylus myapp
```




#### Require home route module `/app.js`

```javascript
var home = require('./routes/index')
```

#### Define home page route `/app.js`

```javascript
app.get('/', home.index)
```






#### Fetch last 5 posts `/routes/index.js`

```javascript
Post.list({ limit:5 }, function(err, posts) {
  if (err) return res.render('error/500')
  posts = posts || []
  res.render('index', { posts:posts })
})
```






#### A way to write posts `/app.js`

```javascript
var write = require('./routes/write')

app.get('/write/:key?', write.show)
app.post('/write/:key?', express.urlencoded(), write.save)
```

#### Showing the edit form `/routes/write.js`

```javascript
var key = req.params.key
if (!key) // new post
  return res.render('write', { post:{} })

// exiting post
Post.get(key, function(err, post) {
  if (err) return res.render('error/500')
  if (!post) return res.render('error/404')
  res.render('write', { post:post })
})
```

#### Saving the post `/routes/write.js`

```javascript
var key = req.params.key || null

var post = new Post(key)
post.title = req.body.title
post.body = req.body.body
post.date = formatDate(new Date())

post.save(function(err) {
  res.redirect('/posts/' + post.key)
})
```

















#### Delete a post `/app.js`

```javascript
app.get('/write/:key/destroy', write.destroy)
```

#### Delete action `/app/write.js`

```javascript
var key = req.params.key

Post.del(key, function() {
  res.redirect('/')
})
```






#### Post page route `/app.js`

```javascript
var post = require('./routes/post')

app.get('/posts/:key', post.show)
```





#### Comments route `/app.js`

```javascript
app.post('/posts/:key', express.urlencoded(), post.comment, post.show)
```


```javascript

```
