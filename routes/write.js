var Post = require('../models/post')

function formatDate(date) {
  return date.toDateString() + ' ' + date.toTimeString().substring(0,5)
}

/*
 * GET write
 */

exports.show = function(req, res) {
  // fetch the post

}


/*
 * POST write
 */

exports.save = function(req, res, next) {
  // save the post

}


/*
 * DELETE write
 */

exports.destroy = function(req, res, next) {
  // delete the post

}

