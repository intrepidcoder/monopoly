# Chance 13: Your building loan matures. Collect $150.

**Edition:** Classic (loaded)<br>
**Deck slot:** 12 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L147)

## Printed instruction

> Your building loan matures. Collect $150.

## Implemented effect

Adds $150 to current player cash (alert category: Chance). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
