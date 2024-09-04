#!/bin/bash

# Fetch contributors data from GitHub API
response=$(curl -s https://api.github.com/repos/Chimoney/chimoney-community-projects/contributors)

# Parse JSON response to extract usernames and avatar URLs
usernames=($(echo "$response" | jq -r '.[].login'))
avatar_urls=($(echo "$response" | jq -r '.[].avatar_url'))

# Clear existing contributors section in README.md between <tbody> and </tbody>
sed -i '/<tbody>/,/<\/tbody>/d' README.md

# Start the table structure in README.md
echo "<table>" >> README.md

# Loop through contributors and append to README.md
for (( i=0; i<${#usernames[@]}; i++ )); do
    username="${usernames[i]}"
    avatar_url="${avatar_urls[i]}"
    avatar_id=$(basename "$avatar_url")

    # Append contributor information as a table cell
    echo "<td align=\"center\" valign=\"top\" width=\"14.28%\">" >> README.md
    echo "<a href=\"https://github.com/$username\"><img src=\"$avatar_url\" width=\"100px;\" alt=\"$username\"/><sub><b>$username</b></sub></a><br />" >> README.md
    echo "<a href=\"https://github.com/Chimoney/chimoney-community-projects/commits?author=$username\" title=\"Code\">💻</a>" >> README.md
    echo "</td>" >> README.md

    # Add a new row after every 6 contributors
    if (( (i + 1) % 6 == 0 )); then
        echo "</tr><tr>" >> README.md
    fi
done

# Close the table structure in README.md
echo "</table>" >> README.md

