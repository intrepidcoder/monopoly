# Community Chest 6: Holiday fund matures. Receive $100.

**Edition:** Classic (loaded)<br>
**Deck slot:** 5 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L122)

## Printed instruction

> Holiday fund matures. Receive $100.

## Implemented effect

Adds $100 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
