# Chance 1: Get out of Jail free. This card may be kept until needed or sold.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 0 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L135)

## Printed instruction

> Get out of Jail free. This card may be kept until needed or sold.

## Implemented effect

Sets the current player Chance jail-free flag. The card is removed from the deck while held, returned when used, and can be traded or transferred at bankruptcy.

**Callback helper:** <code>card callback</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
