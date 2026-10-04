# Chance 15: Catch a bus to Central Park. If you pass GO, collect $200.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 14 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L149)

## Printed instruction

> Catch a bus to Central Park. If you pass GO, collect $200.

## Implemented effect

Moves to board index 9 and awards $200 if destination is behind current position; destination is processed as a normal landing, including rent. See advance (monopoly.js:1874-1895).

**Callback helper:** <code>advance</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
