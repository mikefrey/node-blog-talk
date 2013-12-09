
/**
 * Module dependencies.
 */

var express = require('express')
var http = require('http')
var path = require('path')

var home = require('./routes/index')
var post = require('./routes/post')
var write = require('./routes/write')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', home.index)
app.get('/posts/:key', post.show)
app.post('/posts/:key', express.urlencoded(), post.comment, post.show)
app.get('/write/:key?', write.show)
app.post('/write/:key?', express.urlencoded(), write.save)
app.get('/write/:key/destroy', write.destroy)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
