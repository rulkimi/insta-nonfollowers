const fs = require('fs');

function compareFollowersAndFollowing(followersPath, followingPath, outputPath) {
  try {
    // Read the contents of the followers and following JSON files
    const followersContent = fs.readFileSync(followersPath, 'utf-8');
    const followingContent = fs.readFileSync(followingPath, 'utf-8');

    // Parse the JSON content into JavaScript objects
    const followersData = JSON.parse(followersContent);
    const followingData = JSON.parse(followingContent);

    // Extract usernames from followers and following
    const followersUsernames = followersData.map(entry => entry.string_list_data[0]?.value);
    const followingUsernames = followingData.relationships_following.map(entry => entry.string_list_data[0]?.value);

    // Find values in following but not in followers
    const notInFollowers = followingUsernames.filter(username => !followersUsernames.includes(username));

    // Output the result
    console.log('Usernames present in following but not in followers:', notInFollowers);

    // Write the result to the specified output file
    fs.writeFileSync(outputPath, JSON.stringify(notInFollowers, null, 2), 'utf-8');

    console.log('Comparison completed successfully!');
  } catch (error) {
    console.error('Error comparing followers and following data:', error.message);
  }
}

// Example usage
compareFollowersAndFollowing('followers_1.json', 'following.json', 'comparisonResult.json');
