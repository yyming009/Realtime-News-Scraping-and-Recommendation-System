var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res, next) {
  news = [
    {
      'url':'https://www.cnn.com/2018/03/03/politics/melania-trump-gridiron-dinner/index.html',
      'title':'First lady Melania to attend Gridiron dinner with Trump',
      'description':'They have skirted attending galas where they might have rubbed elbows with members of the media or the Washington establishment.Trump opted not to attend last year journalists and politicians tell jokes and perform comedic skits poking fun at one another. The President also declined to appear at last year',
      'source': 'cnn',
      'urlToImage':'https://cdn.cnn.com/cnnnext/dam/assets/171028113228-donald-and-melania-trump-1026-super-tease.jpg',
      'digest':'3RjuEomJo2601syZbU70HA==\n',
      'reason':'Recommend'
    }
  ]
  res.json(news);
});

module.exports = router;
