const assert = require('chai').assert;
const sorted = require('../cards');
const deck = require('../app');
const badDeck = require('./bad-deck');

describe('Shuffling a deck of cards', () => {

  // create a deep copy of the cards to shuffle, preserve the sorted deck for comparison
  const cards = sorted.slice();

  function duplicateDetector(cards) {
    const cardDict = {};
    let cardName = null;

    for (let i = 0; i < cards.length; i++) {
      cardName = cards[i].value + cards[i].suit;
      if ( cardDict[cardName] ) {
        // if the card is already in the dict, shuffle function duplicated a card
        return false;
      } else {
        // otherwise, put it in the map
        cardDict[cardName] = true;
      }
    }
    return true;
  }


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

  it('returns a deck different from the starting deck when shuffled', () => {

    assert.notDeepEqual(sorted, deck.shuffle(cards));

  });

  it('does not overwrite cards to undefined when shuffled', () => {

    const shuffled = deck.shuffle(cards);
    // Check first and last cards in case of off-by one errors
    assert.isDefined(shuffled[0], 'cards should still be defined');
    assert.isOk(shuffled[0].value, 'cards should still have values');
    assert.isOk(shuffled[0].suit, 'cards should still have suits');
    assert.isDefined(shuffled[51], 'cards should still be defined');
    assert.isOk(shuffled[51].value, 'cards should still have values');
    assert.isOk(shuffled[51].suit, 'cards should still have suits');

  });

  it('modifies the deck each time it is sorted', () => {

    // creates 4 new decks, shuffling each one
    const setA = sorted.slice();
    deck.shuffle(setA);
    const setB = setA.slice();
    deck.shuffle(setB);
    const setC = setB.slice();
    deck.shuffle(setC);
    const setD = setC.slice();
    deck.shuffle(setD);
    assert.notDeepEqual(setA, setB);
    assert.notDeepEqual(setB, setC);
    assert.notDeepEqual(setC, setD);
    assert.notDeepEqual(setD, setA);

  });

  it('does not duplicate card values by shuffling the cards', () => {

    assert.isTrue(duplicateDetector(deck.shuffle(cards)),
      'if you reached this fail, you have a duplicate card');

  });

  it('tests if this can catch an intentionally duplicated value', () => {

    assert.isFalse(duplicateDetector(deck.shuffle(badDeck)),
      'this deck has a duplicate card');

  });


});