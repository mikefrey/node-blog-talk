node-blog-talk
==============

Building a basic blog using express and leveldb

### Following Along

If you're about to watch me give this talk, awesome! Thanks for coming! You'll probably want to clone this repo on your computer and follow these steps to get ready:

```bash
# Clone the repo
git clone https://github.com/mikefrey/node-blog-talk.git

# Install dependencies
npm install

# I recommend running the app with nodemon
# so we get automatic restarts. To install nodemon:
npm install -g nodemon

# Start the app with nodemon
nodemon -w ./ app.js

# or start it normally
node app.js
```

Once you've completed the setup, you should be able to open the blog in your browser of choice via http://localhost:3000. If you have trouble, ask your neighbor, or me.


#### Completed example blog

In the `completed` directory in this repository you'll find the completed blog that we *should* get to by the end of the talk.

To run it, just `cd` into the directory and run `npm install && node app.js` then open http://localhost:3001 in your browser of choice.


### Resources

Express: http://expressjs.com/api.html
EJS: https://github.com/visionmedia/ejs
Stylus: http://learnboost.github.io/stylus/
Level: https://github.com/Level/level
LevelUP: https://github.com/rvagg/node-levelup
Sublevel: https://github.com/dominictarr/level-sublevel
