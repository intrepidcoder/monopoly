# City Tax (square 4)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L77)<br>
**Board index:** 4 of 39

## Data

- Display text: PAY 10% OR $200.
- Purchase price: not purchasable.
- Group number: 0 (special/non-group).
- Color: <code>white</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- No purchase/rent schedule.

## Implemented gameplay

If enabled, the NYC City Tax function presents human players with $200 or 10% of total worth (cash plus owned properties at full/half mortgage value and house-count × house-price, rounded); AI players are charged $200. In all paths, the helper calls undefined addalert before Player.pay, so execution throws and no tax is paid with the current engine.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
