# LUXURY TAX (square 38)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L111)<br>
**Board index:** 38 of 39

## Data

- Display text: Pay $75.
- Purchase price: not purchasable.
- Group number: 0 (special/non-group).
- Color: <code>white</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- No purchase/rent schedule.

## Implemented gameplay

The NYC helper intends to charge $75, but calls undefined addalert before Player.pay; execution throws and no tax is paid with the current engine.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
