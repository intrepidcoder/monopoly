# Community Chest 8: Performed a wedding at the Plaza Hotel. Receive $25

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 7 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L124)

## Printed instruction

> Performed a wedding at the Plaza Hotel. Receive $25

## Implemented effect

Adds $25 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
