const fs = require('fs');

function combineFollowersAndFollowing(followersPath, followingPath, outputPath) {
  try {
    // Read the contents of the followers and following JSON files
    const followersContent = fs.readFileSync(followersPath, 'utf-8');
    const followingContent = fs.readFileSync(followingPath, 'utf-8');

    // Parse the JSON content into JavaScript objects
    const followersData = JSON.parse(followersContent);
    const followingData = JSON.parse(followingContent);

    // Combine the data into the desired format
    const combinedData = {
      followers: followersData.map(entry => entry.string_list_data[0]),
      following: followingData.relationships_following.map(entry => entry.string_list_data[0])
    };

    // Convert the combined data back to JSON format
    const combinedJSON = JSON.stringify(combinedData, null, 2);

    // Write the combined JSON to the specified output file
    fs.writeFileSync(outputPath, combinedJSON, 'utf-8');

    console.log('Followers and following data combined successfully!');
  } catch (error) {
    console.error('Error combining followers and following data:', error.message);
  }
}

// Example usage
combineFollowersAndFollowing('followers_1.json', 'following.json', 'combinedData.json');
