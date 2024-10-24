## Chimoney Readme Translator

This code translates the chimoney readme from the main language (eng) to another language of choice. This is faster than translating one after the other.

The language are in language codes like `fr` for french

Other languages code can be gotten from here and added to the workflow yaml
https://cloud.google.com/translate/docs/languages  


Example
```yaml
- name: Adding README - French
        uses: dephraiim/translate-readme@main
        with:
          LANG: fr
```

## Add GitHub Token

To enable the GitHub Action workflow, you need to create and add a GitHub personal access token (PAT) as a secret in your repository.

### Steps to Generate a GitHub Token:

1. **Go to GitHub's Personal Access Token page:**
   - Navigate to [GitHub Personal Access Tokens](https://github.com/settings/tokens).

2. **Generate a New Token:**
   - Click on **Generate new token** (Classic).

3. **Select Appropriate Scopes for Your Token:**
   - For this workflow, ensure you check the following scopes:
     - `repo` – Full control of private repositories.
     - `workflow` – Update GitHub Action workflows.

4. **Generate and Copy the Token:**
   - After selecting the scopes, generate the token and copy it. Make sure to store it securely, as you won’t be able to see it again once you leave the page.

### Add the GitHub Token as a Secret:

1. **Go to Your Repository Settings:**
   - Open this repository and go to **Settings** > **Secrets** > **New repository secret**.

2. **Add the Secret:**
   - In the **Name** field, enter `GITHUB_TOKEN`.
   - In the **Value** field, paste the token you copied.
   - Click **Add secret** to save it.

## How to run
1. Add `.github\workflows\translate.yml` to the main repo
2. Go to `Actions` in the GitHub repo
3. At the left side click on `Chimoney Translator`
4. Then click `Run Workflow` and `Run Workflow`

The readme will be translated to any language that was stated in the `translate.yml` file
