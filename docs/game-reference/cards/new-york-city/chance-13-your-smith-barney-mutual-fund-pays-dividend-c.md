# Chance 13: Your Smith Barney mutual fund pays dividend. Collect $150.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 12 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L147)

## Printed instruction

> Your Smith Barney mutual fund pays dividend. Collect $150.

## Implemented effect

Adds $150 to current player cash (alert category: Chance). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
