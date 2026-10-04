# Chance 9: Take a walk past The Essex House. Advance to GO. Collect $200.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 8 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L143)

## Printed instruction

> Take a walk past The Essex House. Advance to GO. Collect $200.

## Implemented effect

Calls advance(0, 32). From Chance index 7 or 22, it awards $200; from Chance index 36, it awards $400 because the optional pass-index step awards $200 and the following move to GO awards another $200. See advance (monopoly.js:1874-1895) and the shared rules.

**Callback helper:** <code>advance</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
