const Scorecard = require('../scorecard');
const mongoose = require('mongoose');

describe('scorecard schema', () => {

  it('accepts valid data', () => {
    const data = {
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
    const scorecard = new Scorecard(data);
    const errors = scorecard.validateSync();
    expect(errors).toBeUndefined();

    const json = scorecard.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const scorecard = new Scorecard(data);
    const { errors } = scorecard.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.course.kind).toBe('required');
    expect(errors.score.kind).toBe('required');
    expect(errors['puttingPercentages.circleOnePutting'].kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'Dave T',
      course: 'Orchard Park',
      score: 48,
      holeScores: [3, 2, 3, 3, 2, 3, 2, 3, 1, 4, 2, 3, 3, 2, 2, 4, 3, 3],
      puttingPercentages: {
        circleOnePutting: 0.33,
      },
    };
    const scorecard = new Scorecard(data);
    const errors = scorecard.validateSync();
    expect(errors).toBeUndefined();

    expect(scorecard.isRatedRound).toBe(false);
    expect(scorecard.puttingPercentages.circleTwoPutting).toBe(0);
  });

  it('enforces a minimum of 1 for the total score', () => {
    const data = {
      score: -6,
    };
    const scorecard = new Scorecard(data);
    const { errors } = scorecard.validateSync();
    expect(errors.score.kind).toBe('min');
  });

  it('enforces minimum of 1 throw per hole', () => {
    const data = {
      holeScores: [0, 0],
    };
    const scorecard = new Scorecard(data);
    const { errors } = scorecard.validateSync();
    expect(errors['holeScores.0'].kind).toBe('min');
    expect(errors['holeScores.1'].kind).toBe('min');
  });

  it('enforces limits of 0 to 1 for putting percentages', () => {
    const data = {
      puttingPercentages: {
        circleOnePutting: 1.53,
        circleTwoPutting: -1.53,
      },
    };
    const scorecard = new Scorecard(data);
    const { errors } = scorecard.validateSync();
    expect(errors['puttingPercentages.circleOnePutting'].kind).toBe('max');
    expect(errors['puttingPercentages.circleTwoPutting'].kind).toBe('min');
  });

});