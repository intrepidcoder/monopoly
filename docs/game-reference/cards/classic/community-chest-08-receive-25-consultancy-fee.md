# Community Chest 8: Receive $25 consultancy fee.

**Edition:** Classic (loaded)<br>
**Deck slot:** 7 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L124)

## Printed instruction

> Receive $25 consultancy fee.

## Implemented effect

Adds $25 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
