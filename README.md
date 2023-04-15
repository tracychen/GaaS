# Gate any app with arbitrary on-chain activity!

https://ethglobal.com/showcase/gaas-exadm

# Token-gating is sooo 2022.

Token-gating only captures holders and alienates the rest of the market. Stakers, sellers, buyers, swappers, flippers, and more -- sometimes you want to query for users who are the most ACTIVE on-chain, rather than the biggest WHALES.

The pain points:

"We want to send digital rewards our top community members, as defined as people who trade, claim, and sell every 28 days. Right now this is all done through a giant spreadsheet with manual calculation, lots of spam and bad data.”

- DAO governance lead, Major Exchange

“We want to validate certain on-chain actions performed by community members for our marketing campaigns (e.g. made a deposit, made a withdrawal, etc.). This is done by hand right now and it takes up a lot of time and human error.”

- Head of Community, Trading platform

"We don’t just care about our holders. Half of our community includes stakers and we don’t want to exclude them from participating in our community activities."

- Head of Developer Relations, Payments network platform

💀 STOP SLAVING OVER SPREADSHEETS, QUERIES, AND ENDLESS MANUAL VERIFICATIONS OF ON-CHAIN TRANSACTIONS

Introducing GaaS (Gating-as-a-service). With GaaS, you can gate any app with arbitrary on-chain activity.

1. Create a gate that makes your application or content exclusive to power users. For example, traders on Aave who frequently trade on the DeFi platform.

2. Create a gate that makes your application or content exclusive to stakers. For example, users who have staked their ApeCoin ($APE) for a minimum duration of 1 month.

3. Users are then required to meet these on-chain requirements before they can access your website.

# How it's made

Our hackathon demo project showcases how GaaS can be used to gate some sample content using arbitrary on-chain events and transactions.

Polygon, Scroll:
We used Polygon and Scroll to store gating configuration data on-chain in a trustless and low-gas manner so that anyone can audit the access gating requirements and build on top of them.

Polygon Mumbai contract deployment: https://mumbai.polygonscan.com/address/0xCd4F914Ef4FF4DFb445BA046ecEC00FA266E5F51

Scroll Alpha contract deployment:
https://blockscout.scroll.io/address/0xCd4F914Ef4FF4DFb445BA046ecEC00FA266E5F51

ApeCoin:
We showcase examples of unique and useful access gating based on Staking activity on ApeCoin as well as other arbitrary contract events such as Deposits, Transfers, and more.
