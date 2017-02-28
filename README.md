# Card Shuffler

A small npm package to shuffle a deck of 52 cards and sort it by suit order.

To use, import app.js into your project, imported in the tests as 'deck'.
```
const deck = require('./app.js');
```

**Methods**

The deck has three available methods:

1. deck.shuffle(cards) -- Pass an array of 52 card objects. Loops over the array of cards once, randomly swapping the current index and a random card in the deck. Note: according to wikipedia, this method does have some built-in bias, but I'm considering (52^52) / 52! (or about 2.1160478e+21) to be acceptable margins of error. Returns the deck of cards.

2. deck.sort(cards, ranking) -- Pass an array of 52 card objects and an array with the relative values of the suits. The sorting method uses a recursive merge sort to break the cards deck into successively smaller decks, once split into single-item arrays, it calls a compare method to rebuild a deck with the cards in order by suit, then by value. Returns the deck of cards.

3. deck.compare(cardA, cardB, ranking) -- Pass two individual card objects and an array with the relative ranking of suits. The suit is weighted from first as least to last as most, which is represented by a multiple of the index value in the array. Returns a boolean for (cardA > cardB)

**Cards**

Cards are represented as JavaScript objects with a "value" and "suit" property, for example:
{ "value":"A", "suit":"spades" }

'Face' value cards (Jack, Queen, King, Ace) are represented with a string for the letter, rather than a numerical value, in the test data. It would be a quick refactor of the compare function to change to purely numerical values.

**Tests**

Tests are run using Mocha with Chai's assertion library. Run with either 'mocha' or npm test.
Files are linted using eslint.
