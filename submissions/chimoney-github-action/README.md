# Chimoney Payout action

This github action faciliates financial transactions withing github workflows through the use of the Chimoney API.

## Inputs

### `amount`

**Required** The amount to pay the github user. Default `1`.

### `username`

**Required** The github username of the receipient.

## Outputs

### `paymentLink`

The payment link to fund the transaction.

## Environment Variable

### `CHIMONEY_API_KEY`

The API Key located on the Chimoney developer dashboard. Visit [chimoney.io]("https://chimoney.io/") for more information.

### `GITHUB_TOKEN`

The github token located at ${{secrets.GITHUB_TOKEN}}

## Example usage

```yaml
on:
  pull_request:
    types: [closed]

jobs:
  sponsor-contributor:
    runs-on: ubuntu-latest
    steps:
      - name: Reward contributor via chimoney
        id: payout
        uses: chimoney/chimoney-community-projects/submissions/chimoney-github-action@v1.0
        with:
          amount: 5
          username: ${{ github.event.pull_request.user.login }}
        env: # Or as an environment variable
          CHIMONEY_API_KEY: ${{secrets.CHIMONEY_API_KEY}}
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
      # Payment link could be logged to slack or sent to a sponsor's email
      - name: Print payment link
        run: echo "Here is your payment link ${{ steps.payout.outputs.paymentLink }}"
```

![](chimoney_action_screenshot.png)

## Limitations

- The action cannot work without the recepient having a public email address on their github profile.
- For compliance purposes, the maximum payout for any given transaction is $10.

## TODO

- Add an optional fallback email address in the event that the recepeint's email is private
