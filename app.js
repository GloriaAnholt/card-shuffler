// Module which takes a deck of cards and shuffles in place or sorts
// according to the suit ranking passed in.

module.exports = {

  shuffle(cards) {
    // Given a deck of 52 cards, returns a randomized deck in O(n) passes. Shuffles in place.
    if (cards.length !== 52) throw new RangeError('Deck must contain 52 cards');

    for (let i = 0; i < cards.length; i++) {
      let j = Math.floor(52 * Math.random());
      let swap = cards[j];
      cards[j] = cards[i];
      cards[i] = swap;
    }

    return cards;

  },

  sort(cards, ranking) {
    // Given a deck of cards, sort it into order based on the suit ranking passed in

    // If the array is longer than one, recursively call merge until at len of one
    if (cards.length > 1) {
      let mid = Math.floor(cards.length / 2);
      let left = cards.slice(0, mid); // excludes mid-point
      let right = cards.slice(mid);   // slices to end of array

      this.sort(left, ranking);
      this.sort(right, ranking);

      let l = 0, r = 0, i = 0;

      while ( l < left.length && r < right.length ) {
        // If the left is smaller, add it to the list
        if (this.compare(right[r], left[l], ranking)) {
          cards[i] = left[l];
          l++;
        // otherwise right is smaller, add it to list
        } else {
          cards[i] = right[r];
          r++;
        } // increment counter
        i++;
      }

      // If there's anything remaining in the left list, add it first
      while ( l < left.length ) {
        cards[i] = left[l];
        l++;
        i++;
      }

      // If there's anything remaining in the right list, add it last
      while ( r < right.length ) {
        cards[i] = right[r];
        r++;
        i++;
      }
    }

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

