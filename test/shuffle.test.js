const assert = require('chai').assert;
const sorted = require('../cards');
const deck = require('../app');

describe('Shuffling a deck of cards', () => {

  // create a deep copy of the cards to shuffle, preserve the sorted deck for comparison
  const cards = sorted.slice();

  it('returns the same number of cards as given', () => {

    assert.equal(cards.length, 52);
    assert.equal(deck.shuffle(cards).length, 52);

  });

  it('returns a deck different from the starting deck', () => {

    assert.notDeepEqual(sorted, deck.shuffle(cards));

  });

});