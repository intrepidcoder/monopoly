# Chance 2: Make General Repairs on All Your Property. For each house pay $25. For each hotel $100.

**Edition:** Classic (loaded)<br>
**Deck slot:** 1 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L136)

## Printed instruction

> Make General Repairs on All Your Property. For each house pay $25. For each hotel $100.

## Implemented effect

Charges $25 per house and $100 per hotel across owned properties; hotels are counted once. See streetrepairs (monopoly.js:1931-1956).

**Callback helper:** <code>streetrepairs</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
