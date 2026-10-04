# Chance 11: ADVANCE to Boardwalk.

**Edition:** Classic (loaded)<br>
**Deck slot:** 10 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L145)

## Printed instruction

> ADVANCE to Boardwalk.

## Implemented effect

Moves to board index 39 and awards $200 if destination is behind current position; destination is processed as a normal landing, including rent. See advance (monopoly.js:1874-1895).

**Callback helper:** <code>advance</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
