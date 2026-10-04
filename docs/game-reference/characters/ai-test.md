# AI Test

**Kind:** Demonstration-only computer opponent selected as “AI (Test)” in setup.<br>
**Source:** AITest (ai.js:2-208); called by setup/turn, landing, auction, and trade paths in monopoly.js.

## Decision methods

- `buyProperty(index)` (`ai.js:14-26`): buys only when cash exceeds price by more than $50.
- `acceptTrade(tradeObj)` (`ai.js:30-62`): values money at face value, jail-free cards at $10 each, and properties at listed price (half when mortgaged). Accepts if net value is above $25; may counter if net value is at least -$50 and initiator funds exceed its computed offer.
- `beforeTurn()` (`ai.js:65-119`): seeks complete color groups, tries to build on the least-developed square if cash exceeds cost by more than $100, then unmortgages if cash exceeds listed price. Returns false (no trade proposed).
- `onLand()` (`ai.js:123-160`): at most once may offer its one utility for an opponent-owned railroad, only when dice are not doubles; otherwise returns false.
- `postBail()` (`ai.js:164-172`): uses a held jail-free card only on the third jail roll.
- `payDebt()` (`ai.js:177-191`): mortgages undeveloped unmortgaged holdings from square 39 down to 0 until cash is nonnegative or no holdings remain.
- `bid(property, currentBid)` (`ai.js:196-207`): proposes current bid plus random $10-$30; exits if that would leave less than $50 cash or exceed 1.5× property price.

## State and limitations

AITest.count generates AI names; each instance keeps alertList for deferred UI alerts. It uses global player/square state and shared functions such as buyHouse, mortgage, unmortgage, and game.trade. This is a heuristic demo, not a named fictional character or rules authority.
