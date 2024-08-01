
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
    echo "<div style=\"display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; padding: 10px;\">" >> "$readme_file"

    for (( i=0; i<${#usernames[@]}; i++ )); do
        username="${usernames[i]}"
        avatar_url="${avatar_urls[i]}"

        # Calculate width percentage for responsive design
        num_columns=6
        if (( (i + 1) % 6 == 0 )); then
            num_columns=5
        elif (( (i + 1) % 5 == 0 )); then
            num_columns=4
        elif (( (i + 1) % 4 == 0 )); then
            num_columns=3
        elif (( (i + 1) % 3 == 0 )); then
            num_columns=2
        else
            num_columns=6
        fi

        width_percent=$(echo "100 / $num_columns - 20" | bc)
        width_style="width: calc($width_percent% - 20px); flex: 1 1 $width_percent%"

        echo "<div style=\"${width_style}; text-align: center;\">" >> "$readme_file"
        echo "<a href=\"https://github.com/$username\">" >> "$readme_file"
        echo "<img src=\"$avatar_url\" width=\"100px\" alt=\"$username\"/><br /><sub><b>$username</b></sub>" >> "$readme_file"
        echo "</a><br />" >> "$readme_file"
        echo "<a href=\"https://github.com/Chimoney/chimoney-community-projects/commits?author=$username\" title=\"Code\">💻</a>" >> "$readme_file"
        echo "</div>" >> "$readme_file"

        # Add a new row after every 6 contributors
        if (( (i + 1) % 6 == 0 )); then
            echo "<div style=\"flex-basis: 100%;\"></div>" >> "$readme_file"
        fi
    done

    echo "</div>" >> "$readme_file"
}

# Iterate over all README files
for readme_file in README*; do
    if [[ -f "$readme_file" ]]; then
        update_readme "$readme_file"
    fi
done
