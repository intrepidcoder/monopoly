# TRUMP TOWER (square 39)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L112)<br>
**Board index:** 39 of 39

## Data

- Display text: $400.
- Purchase price: $400.
- Group number: 10.
- Color: <code>blue</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Building price: $200 per house or hotel.
- Base rent: $50; one house: $200; two: $600; three: $1400; four: $1700; hotel: $2000.

## Implemented gameplay

Ownable color-group street. A full group doubles base rent while this property is unimproved; otherwise rent follows the listed 1-4 house/hotel schedule. See shared rules for full-group, even building, mortgages, and sales.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
