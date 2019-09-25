const router = require('express').Router();
const Scorecard = require('../models/scorecard');

router

  .post('/', (req, res, next) => {
    Scorecard.create(req.body)
      .then(scorecard => {
        return res.json(scorecard);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Scorecard.findById(req.params.id)
      .then(scorecard => {
        return res.json(scorecard);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Scorecard.find()
      .then(scorecards => {
        return res.json(scorecards);
      })
      .catch(next);
  })


;

module.exports = router;
