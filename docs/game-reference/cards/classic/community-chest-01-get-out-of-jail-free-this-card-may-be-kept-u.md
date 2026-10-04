# Community Chest 1: Get out of Jail, Free. This card may be kept until needed or sold.

**Edition:** Classic (loaded)<br>
**Deck slot:** 0 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L117)

## Printed instruction

> Get out of Jail, Free. This card may be kept until needed or sold.

## Implemented effect

Sets the current player Community Chest jail-free flag. The card is removed from the deck while held, returned when used, and can be traded or transferred at bankruptcy.

**Callback helper:** <code>card callback</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
