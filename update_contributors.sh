#!/bin/bash


response=$(curl -s https://api.github.com/repos/Chimoney/chimoney-community-projects/contributors)


usernames=($(echo "$response" | jq -r '.[].login'))
avatar_urls=($(echo "$response" | jq -r '.[].avatar_url'))

# Clear existing contributors section in README.md
sed -i '/<tbody>/,/<\/tbody>/d' README.md

# Loop through contributors and append to README.md
for (( i=0; i<${#usernames[@]}; i++ )); do
    username="${usernames[i]}"
    avatar_url="${avatar_urls[i]}"
    # Extract avatar ID from avatar URL
    avatar_id=$(basename "$avatar_url")
    echo "<td align=\"center\" valign=\"top\" width=\"14.28%\"><a href=\"https://github.com/$username\"><img src=\"$avatar_url\" width=\"100px;\" alt=\"$username\"/><sub><b>$username</b></sub></a><br /><a href=\"https://github.com/Chimoney/chimoney-community-projects/commits?author=$username\" title=\"Code\">💻</a></td>" >> README.md
done
