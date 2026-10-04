# St. James Place (square 16)

**Edition:** Classic (loaded by index.html)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L89)<br>
**Board index:** 16 of 39

## Data

- Display text: $180.
- Purchase price: $180.
- Group number: 6.
- Color: <code>#FFA500</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Building price: $100 per house or hotel.
- Base rent: $14; one house: $70; two: $200; three: $550; four: $750; hotel: $950.

## Implemented gameplay

Ownable color-group street. A full group doubles base rent while this property is unimproved; otherwise rent follows the listed 1-4 house/hotel schedule. See shared rules for full-group, even building, mortgages, and sales.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
