# Port Authority Bus Terminal (square 1)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L74)<br>
**Board index:** 1 of 39

## Data

- Display text: $60.
- Purchase price: $60.
- Group number: 3.
- Color: <code>#4B0082</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Building price: $50 per house or hotel.
- Base rent: $2; one house: $10; two: $30; three: $90; four: $160; hotel: $250.

## Implemented gameplay

Ownable color-group street. A full group doubles base rent while this property is unimproved; otherwise rent follows the listed 1-4 house/hotel schedule. See shared rules for full-group, even building, mortgages, and sales.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
