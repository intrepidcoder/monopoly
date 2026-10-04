# Chance 4: You have been elected chairman of the board. Pay each player $50.

**Edition:** Classic (loaded)<br>
**Deck slot:** 3 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L138)

## Printed instruction

> You have been elected chairman of the board. Pay each player $50.

## Implemented effect

Pays $50 to every other player; this can create debt. See payeachplayer (monopoly.js:1835-1850).

**Callback helper:** <code>payeachplayer</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
