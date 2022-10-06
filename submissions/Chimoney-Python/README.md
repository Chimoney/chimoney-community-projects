# PyChimoney

pychimoney is a python wrapper for <a href="https://chimoney.io"> Chimoney </a>

    - Account (Done)
    - Info (Done)
    - Payout(Done)
    - Mobile Money (Done)
    - Wallet (Done)
    - Sub-Account (Done)
    - Redeem (Done)

## Getting Started
    - Register with <a href="https://chimoney.io"> Chimoney </a>
    - Request for API KEY from support
    - set Your "CHIMONEY_AUTH_KEY" environment variable

## Installing 
    - pip install pychimoney
### OR
    - git clone "the repo"
    - cd pychimoney
    - python setup.py install or
    - pip3 install .

## Usage
#### Importing the package
```python
from pychimoney import Chimoney
```
#### Creating an instance of the Chimoney class
```python
chimoney = Chimoney()
```

#### Full Example
```python
    from pychimoney import Chimoney
    import os

    # Initialize Chimoney
    chimoney = Chimoney.set_api_key("CHIMONEY_AUTH_KEY")

    # ping Chimoney
    chimoney.ping()
```
 #### Using the Account API
 ```python

    chimoney.account.required_function(params)
```

## TODO

- [ ] Add all Endpoints
- [ ] Write Unit Tests
- [ ] Package the Library
- [ ] Add to Pip
- [ ] Add Pytest and Covrage for Test
- [ ] Documentation
