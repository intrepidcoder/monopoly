# Community Chest 11: Pay school fees of $50.

**Edition:** Classic (loaded)<br>
**Deck slot:** 10 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L127)

## Printed instruction

> Pay school fees of $50.

## Implemented effect

Charges current player $50 (alert category: Community Chest); insufficient funds create debt. See subtractamount (monopoly.js:1795-1801).

**Callback helper:** <code>subtractamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
