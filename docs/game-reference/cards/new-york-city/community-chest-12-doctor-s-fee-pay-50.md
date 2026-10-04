# Community Chest 12: Doctor's fee. Pay $50

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 11 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L128)

## Printed instruction

> Doctor's fee. Pay $50

## Implemented effect

Charges current player $50 (alert category: Community Chest); insufficient funds create debt. See subtractamount (monopoly.js:1795-1801).

**Callback helper:** <code>subtractamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
