# Community Chest 2: You have won lifetime home delivery of the New York Times. Collect $10

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 1 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L118)

## Printed instruction

> You have won lifetime home delivery of the New York Times. Collect $10

## Implemented effect

Adds $10 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
