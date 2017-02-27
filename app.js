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

    return cards;

  },

  compare(a, b, suitRank) {

    const face = {"J": 11, "Q": 12, "K": 13, "A": 14};

    //evaluates the suit value based on the ranking order passed in (as an array)
    let modA = suitRank.indexOf(a.suit) * 13;
    let modB = suitRank.indexOf(b.suit) * 13;

    // converts face cards to numerical value, otherwise assigns value
    let valA = (typeof a.value === 'string') ? face[a.value] : a.value;
    let valB = (typeof b.value === 'string') ? face[b.value] : b.value;

    return (valA + modA) > (valB + modB);

  }

};

