const fs = require('fs');

function compareFollowersAndFollowing(followersPath, followingPath, outputPath) {
  try {
    const followersContent = fs.readFileSync(followersPath, 'utf-8');
    const followingContent = fs.readFileSync(followingPath, 'utf-8');

    const followersData = JSON.parse(followersContent);
    const followingData = JSON.parse(followingContent);

    // Extract usernames and href from followers and following
    const followersInfo = followersData.map(entry => ({ value: entry.string_list_data[0]?.value, href: entry.string_list_data[0]?.href }));
    const followingInfo = followingData.relationships_following.map(entry => ({ value: entry.string_list_data[0]?.value, href: entry.string_list_data[0]?.href }));

    // Find entries in following but not in followers
    const notInFollowers = followingInfo.filter(followingEntry =>
      !followersInfo.some(followerEntry => followerEntry.value === followingEntry.value)
    );

    console.log('Entries present in following but not in followers:', notInFollowers);
    fs.writeFileSync(outputPath, JSON.stringify(notInFollowers, null, 2), 'utf-8');
    console.log('Comparison completed successfully!');
    
  } catch (error) {
    console.error('Error comparing followers and following data:', error.message);
  }
}

compareFollowersAndFollowing('followers_1.json', 'following.json', 'unfollowers.json');
