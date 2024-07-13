#!/bin/bash

# Fetch contributors data from GitHub API
response=$(curl -s https://api.github.com/repos/Chimoney/chimoney-community-projects/contributors)

# Parse JSON response to extract usernames and avatar URLs
usernames=($(echo "$response" | jq -r '.[].login'))
avatar_urls=($(echo "$response" | jq -r '.[].avatar_url'))

# Remove existing table structure in README.md
sed -i '/<table>/,/<\/table>/d' README.md

# Start the new table structure in README.md
echo "<table>" >> README.md

# Loop through contributors and append to README.md
for (( i=0; i<${#usernames[@]}; i++ )); do
    username="${usernames[i]}"
    avatar_url="${avatar_urls[i]}"
    avatar_id=$(basename "$avatar_url")

    if (( i > 0 && i % 6 == 0 )); then
        echo "</tr><tr>" >> README.md
    elif (( i == 0 )); then
        echo "<tr>" >> README.md
    fi

    # Append contributor information as a table cell
    echo "<td align=\"center\" valign=\"top\" width=\"14.28%\">" >> README.md
    echo "<a href=\"https://github.com/$username\"><img src=\"$avatar_url\" width=\"100px;\" alt=\"$username\"/><sub><b>$username</b></sub></a><br />" >> README.md
    echo "<a href=\"https://github.com/Chimoney/chimoney-community-projects/commits?author=$username\" title=\"Code\">💻</a>" >> README.md
    echo "</td>" >> README.md

done

# Close the last row of the table in README.md
echo "</tr>" >> README.md

# Close the table structure in README.md
echo "</table>" >> README.md
