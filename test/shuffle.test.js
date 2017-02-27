const assert = require('chai').assert;
const cards = require('../cards');
const deck = require('../app');

describe('Shuffling a deck of cards', () => {

  it('returns the same number of cards as given', () => {

    assert.equal(cards.length, 52);
    let shuffled = deck.shuffle(cards);
    assert.equal(shuffled.length, 52);

  });

});