# Chimoneyjs

Chimoneyjs is a js wrapper for <a href="https://chimoney.io"> Chimoney </a>

    - Account
    - Info
    - Payout
    - Mobile Money
    - Wallet
    - Sub-Account
    - Redeem

## Getting Started

- Register with <a href="https://chimoney.io"> Chimoney </a>
- Request for API KEY from support
- set Your "CHIMONEY_AUTH_KEY" environment variable

## Installing

    - npm install chimoneyjs

## Usage

#### Importing the package

```js
// Initialise chimoney with your API key
const chimoney = require("chimoneyjs")(YOURAPIKEY);
```

#### Full Example

```js
require("dotenv").config();
const chimoney = require("chimoneyjs")(process.env.MYAPIKEY);
```

#### Using the Account API

```js
require("dotenv").config();
const { account } = require("chimoneyjs")(process.env.MYAPIKEY);
```

## TODO

- [ ] Add all Endpoints

  - [x] Account
  - [x] Info
  - [x] Payout
  - [ ] Mobile Money
  - [ ] Wallet
  - [ ] Sub Account
  - [ ] Redeem

- [ ] Write Unit Tests
  - [x] Account
  - [x] Info
  - [x] Payout
  - [ ] Mobile Money
  - [ ] Wallet
  - [ ] Sub Account
  - [ ] Redeem
- [ ] Publish library on npm
- [ ] Documentation
