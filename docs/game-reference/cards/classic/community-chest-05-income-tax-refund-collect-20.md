# Community Chest 5: Income tax refund. Collect $20.

**Edition:** Classic (loaded)<br>
**Deck slot:** 4 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L121)

## Printed instruction

> Income tax refund. Collect $20.

## Implemented effect

Adds $20 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
