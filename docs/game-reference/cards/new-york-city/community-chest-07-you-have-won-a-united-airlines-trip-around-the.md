# Community Chest 7: You have won a United Airlines trip around the world! Collect $100

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 6 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L123)

## Printed instruction

> You have won a United Airlines trip around the world! Collect $100

## Implemented effect

Adds $100 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
