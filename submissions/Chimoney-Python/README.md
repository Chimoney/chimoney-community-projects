# PyChimoney

pychimoney is a python wrapper for <a href="https://chimoney.io"> Chimoney </a>

    - Account (Done)
    - Info (Done)
    - Payout(Work in Progress)
    - Mobile Money (Work in Progress)
    - Wallet (Work in Progress)
    - Sub-Account (Work in Progress)
    - Redeem (Work in Progress)

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

    # Set your Chimoney Auth Key
    os.environ['CHIMONEY_AUTH_KEY'] = 'YOUR_CHIMONEY_AUTH_KEY'

    # Initialize Chimoney
    chimoney = Chimoney()

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