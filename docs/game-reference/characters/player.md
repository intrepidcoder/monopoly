# Player

**Kind:** Shared player state model instantiated for each seat and the bank placeholder.<br>
**Source:** Player (monopoly.js:1110-1146).

## State and capabilities

Stores name, display color, board position (initially GO), $1,500 cash, creditor, jail status and failed-roll count, Community Chest and Chance jail-free flags, auction participation, and whether the seat is human-controlled. Setup can attach an AITest object (monopoly.js:2610-2658). Color is visual only; the 16 UI colors are not distinct characters. The board renders each participant as a colored CSS marker rather than a named token (updatePosition, monopoly.js:1281-1359).

Player.pay(amount, creditor) subtracts the amount and refreshes the display. It returns true when funds cover payment; otherwise it still subtracts, records the creditor, and returns false. The game later checks negative balances and processes bankruptcy. Movement, rent, trading, jail escape, and asset management are shared engine functions, not per-player methods. See [shared gameplay rules](../gameplay-rules.md).
