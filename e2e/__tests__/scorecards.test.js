const request = require('../request');
const db = require('../db');

describe('scorecards api', () => {

  beforeEach(() => db.dropCollection('scorecards'));

  const scorecard1 = {
    name: 'Dave T',
    course: 'Orchard Park',
    score: 48,
    holeScores: [3, 2, 3, 3, 2, 3, 2, 3, 1, 4, 2, 3, 3, 2, 2, 4, 3, 3],
    puttingPercentages: {
      circleOnePutting: 0.33,
      circleTwoPutting: 0,
    },
    isRatedRound: false,
  };

  function postScorecard(data) {
    return request
      .post('/api/scorecards')
      .send(data)
      .expect(200)
      .then(({ body }) => body);   // same as res => res.body
  }

  it('posts valid data', () => {
    return postScorecard(scorecard1)
      .then(scorecard => {
        expect(scorecard).toEqual({
          __v: 0,
          _id: expect.any(String),
          ...scorecard1
        });
      });
  });

  it('gets a scorecard by id', () => {
    return postScorecard(scorecard1)
      .then(scorecard => {
        return request
          .get(`/api/scorecards/${scorecard._id}`)
          .expect(200)
          .then(({ body }) => expect(body).toEqual(scorecard));
      });
  });

  it('gets all scorecards', () => {
    return Promise.all([postScorecard(scorecard1), postScorecard(scorecard1), postScorecard(scorecard1)])
      .then(() => {
        return request
          .get(`/api/scorecards`)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });



});