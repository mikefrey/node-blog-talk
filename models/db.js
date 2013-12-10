var path = require('path')
var level = require('level')
var sublevel = require('level-sublevel')

// create/open the leveldb database
var dbLocation = path.join(__dirname, '../data/blog')
var db = sublevel(level(dbLocation, {valueEncoding:'json'}))

module.exports = db
