const router = require('express').Router();
const Scorecard = require('../models/scorecard');

router
  .post('/', (req, res, next) => {
    Scorecard.create(req.body)
      .then(scorecard => {
        // console.log(scorecard);
        return res.json(scorecard);
      })
      .catch(next);
  });

module.exports = router;
