# Community Chest 14: Advance to "GO" (Collect $200).

**Edition:** Classic (loaded)<br>
**Deck slot:** 13 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L130)

## Printed instruction

> Advance to "GO" (Collect $200).

## Implemented effect

Moves to GO and awards $200 when wrapping the board; then processes GO as the destination. See advance (monopoly.js:1874-1895).

**Callback helper:** <code>advance</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
