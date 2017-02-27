const assert = require('chai').assert;
const sorted = require('../cards');
const deck = require('../app');

describe('Shuffling a deck of cards', () => {

  // create a deep copy of the cards to shuffle, preserve the sorted deck for comparison
  const cards = sorted.slice();

  it('throws an error if the wrong number of cards are passed in', () => {
    // assert.throw takes a not-invoked function as its first parameter, but we need to
    // call shuffle passing an insufficient deck. Wrapped cards in an anonymous function.

    let tooShort = new Array(51);
    assert.throw(() => {
      deck.shuffle(tooShort); },
      RangeError, 'Deck must contain 52 cards'
    );

    let tooLong = new Array(53);
    assert.throw(() => {
      deck.shuffle(tooLong); },
      RangeError, 'Deck must contain 52 cards'
    );

  });

  it('returns the same number of cards as given', () => {

    assert.equal(cards.length, 52);
    assert.equal(deck.shuffle(cards).length, 52);

  });

  it('returns a deck different from the starting deck', () => {

    assert.notDeepEqual(sorted, deck.shuffle(cards));

  });

});