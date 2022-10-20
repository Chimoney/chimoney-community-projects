# PyChimoney

pychimoney is a python wrapper for <a href="https://chimoney.io"> Chimoney </a>

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
    - pip install chimoney-py
### OR
    - git clone "the repo"
    - cd pychimoney
    - python setup.py install or
    - pip3 install .

## Usage
#### Importing the package
```python
from chimoney import Chimoney
```
#### Creating an instance of the Chimoney class
```python
chimoney = Chimoney.set_api_key("API-KEY")
```

#### Full Example
```python
    from pychimoney import Chimoney
    import os

    # Initialize Chimoney
    chimoney = Chimoney.set_api_key("CHIMONEY_AUTH_KEY")
```
 #### Using the Account API
 ```python

    chimoney.account.required_function(params)
```

## TODO

- [x] Add all Endpoints
- [ ] Write Unit Tests
- [x] Package the Library
- [x] Add to Pip
- [ ] Add Pytest and Covrage for Test
- [ ] Documentation
