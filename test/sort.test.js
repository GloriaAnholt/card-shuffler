const assert = require('chai').assert;
const sorted = require('../cards');
const deck = require('../app');

describe('Sorts a deck of cards', () => {

  // create a deep copy of the cards to shuffle, preserve the sorted deck for comparison
  const cards = sorted.slice();

  it('evaluates the value of cards based on suit order', () => {
    // the compare function takes two card objects and an array for suit values and returns
    // a boolean for (a > b)
    let bridgeRanking = ['clubs', 'diamonds', 'hearts', 'spades'];
    let chineseRanking = ['diamonds', 'clubs', 'hearts', 'spades'];

    let clubs = { value: 2, suit: 'clubs' };
    let diamonds = { value: 2, suit: 'diamonds' };
    let trump = { value: 'A', suit: 'spades'};

    assert.isTrue(deck.compare(clubs, diamonds, chineseRanking));
    assert.isFalse(deck.compare(clubs, diamonds, bridgeRanking));

    assert.isFalse(deck.compare(diamonds, clubs, chineseRanking));
    assert.isTrue(deck.compare(diamonds, clubs, bridgeRanking));

    assert.isTrue(deck.compare(trump, clubs, bridgeRanking));
    assert.isTrue(deck.compare(trump, diamonds, chineseRanking));

  });

  it('sorts a shuffled deck back to the original sorted configuration', () => {

    assert.notDeepEqual(sorted, deck.shuffle(cards));
    deck.mergesort(cards, ['clubs', 'diamonds', 'hearts', 'spades']);
    assert.deepEqual(sorted, cards);

  });

});