// Module which takes a deck of cards and shuffles in place or sorts
// according to the suit ranking passed in.

module.exports = {

  shuffle(cards) {
    // Given a deck of 52 cards, returns a randomized deck in O(n) passes. Shuffles in place.
    if (cards.length !== 52) throw new RangeError('Deck must contain 52 cards');

    return cards.map((cur, i, deck) => {
      let j = Math.floor(52 * Math.random());
      deck[i] = deck[j];
      deck[j] = cur;
    });

  },

  sort(cards /*, ranking */) {
    // Given a deck, sorts a randomized deck based on the suit ranking passed in.
    if (cards.length !== 52) throw new RangeError({ message: 'Deck must contain 52 cards' });
  }

};

