# Chance 5: Go back 3 spaces.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 4 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L139)

## Printed instruction

> Go back 3 spaces.

## Implemented effect

Moves back three board indices and processes destination through gobackthreespaces / land (monopoly.js:1827-1833, 2282-2415).

**Callback helper:** <code>gobackthreespaces</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
