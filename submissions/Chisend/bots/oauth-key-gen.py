# 3 legged OAuth

import tweepy

oauth1_user_handler = tweepy.OAuth1UserHandler(
    "access-token", "access-secret", callback="oob"
)

print(oauth1_user_handler.get_authorization_url(signin_with_twitter=True))


verifier = input("Input PIN: ")
access_token, access_token_secret = oauth1_user_handler.get_access_token(verifier)

# store access_token and access_token_secret somewhere safe
with open("access_token.txt", "w") as f:
    f.write(access_token)
    f.write("\n")
    f.write(access_token_secret)
