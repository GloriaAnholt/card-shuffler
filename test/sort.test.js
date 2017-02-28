const assert = require('chai').assert;
const sorted = require('../cards');
const deck = require('../app');

describe('Sorts a deck of cards', () => {

  // create a deep copy of the cards to shuffle and resort, preserve the sorted deck for comparison
  const cards = sorted.slice();
  const bridgeRanking = ['clubs', 'diamonds', 'hearts', 'spades'];

  it('evaluates the value of cards based on suit order', () => {
    // the compare function takes two card objects and an array for suit values and returns
    // a boolean for (a > b)
    let chineseRanking = ['diamonds', 'clubs', 'hearts', 'spades'];

    let club = { value: 'J', suit: 'clubs' };
    let diamond = { value: 'J', suit: 'diamonds' };
    let trump = { value: 'A', suit: 'spades'};

    assert.isTrue(deck.compare(club, diamond, chineseRanking), 'clubs should be higher');
    assert.isFalse(deck.compare(club, diamond, bridgeRanking), 'diamonds should be higher');

    assert.isFalse(deck.compare(diamond, club, chineseRanking), 'clubs should be higher');
    assert.isTrue(deck.compare(diamond, club, bridgeRanking), 'diamonds should be higher');

    assert.isTrue(deck.compare(trump, club, bridgeRanking), 'Ace of spades always wins');
    assert.isTrue(deck.compare(trump, diamond, chineseRanking), 'Ace of spades always wins');

  });

  it('sorts a shuffled deck back to the original sorted configuration', () => {

    assert.notDeepEqual(sorted, deck.shuffle(cards));
    deck.sort(cards, bridgeRanking);
    assert.deepEqual(sorted, cards);

  });

});