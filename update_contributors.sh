
repo_url="https://api.github.com/repos/Chimoney/chimoney-community-projects"

page=1
per_page=100  # can handle 100 contributors

update_readme() {
    local readme_file=$1

    # Fetch contributors
    response=$(curl -s "${repo_url}/contributors?page=${page}&per_page=${per_page}")

    # Parse JSON response to extract usernames and avatar URLs
    usernames=($(echo "$response" | jq -r '.[].login'))
    avatar_urls=($(echo "$response" | jq -r '.[].avatar_url'))

    # Allow addition of more than 30 contributors (pagination)
    while [ "$(jq '. | length' <<< "$response")" -gt 0 ]; do
        response=$(curl -s "${repo_url}/contributors?page=$((++page))&per_page=100")
        usernames+=($(echo "$response" | jq -r '.[].login'))
        avatar_urls+=($(echo "$response" | jq -r '.[].avatar_url'))
    done

    # Clear table
    sed -i '/<table>/,/<\/table>/d' "$readme_file"

    # Start the table 
    echo "<table>" >> "$readme_file"
    echo "<style>
            .avatar-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                padding: 10px;
            }
            .avatar-item {
                flex: 1 1 calc(100% / 6 - 20px); /* Adjusts the number of items per row */
                max-width: calc(100% / 6 - 20px);
                text-align: center;
            }
            @media (max-width: 1200px) {
                .avatar-item {
                flex: 1 1 calc(100% / 5 - 20px);
                max-width: calc(100% / 5 - 20px);
                }
            }
            @media (max-width: 900px) {
                .avatar-item {
                flex: 1 1 calc(100% / 4 - 20px);
                max-width: calc(100% / 4 - 20px);
                }
            }
            @media (max-width: 600px) {
                .avatar-item {
                flex: 1 1 calc(100% / 3 - 20px);
                max-width: calc(100% / 3 - 20px);
                }
            }
            @media (max-width: 400px) {
                .avatar-item {
                flex: 1 1 calc(100% / 2 - 20px);
                max-width: calc(100% / 2 - 20px);
                }
            }
        </style>" >> "$readme_file"

    echo "<div class=\"avatar-grid\">">>"$readme_file"
    echo "<tr>" >> "$readme_file"

    for (( i=0; i<${#usernames[@]}; i++ )); do
        username="${usernames[i]}"
        avatar_url="${avatar_urls[i]}"
        echo "<div class=\"avatar-item\">" >> "$readme_file"
        # Append contributor information as a table cell
        echo "<td align=\"center\" valign=\"top\" width=\"14.28%\">" >> "$readme_file"
        echo "<a href=\"https://github.com/$username\"><img src=\"$avatar_url\" width=\"100px;\" alt=\"$username\"/><br /><sub><b>$username</b></sub></a><br />" >> "$readme_file"
        echo "<a href=\"https://github.com/Chimoney/chimoney-community-projects/commits?author=$username\" title=\"Code\">💻</a>" >> "$readme_file"
        echo "</td>" >> "$readme_file"
        echo "</div>" >> "$readme_file"

        # Add a new row after every 6 contributors
        if (( (i + 1) % 6 == 0 )); then
            echo "</tr><tr>" >> "$readme_file"
        fi
    done

    echo "</tr>" >> "$readme_file"
    echo "</div>" >> "$readme_file"
    echo "</table>" >> "$readme_file"
}

# Iterate over all README files
for readme_file in READ*; do
    if [[ -f "$readme_file" ]]; then
        update_readme "$readme_file"
    fi
done
