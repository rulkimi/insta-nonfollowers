const displayEl = document.querySelector('.js-display');

function validateFile(inputId, expectedFileName) {
  const inputElement = document.getElementById(inputId);
  const file = inputElement.files[0];

  if (file) {
    const fileName = file.name.toLowerCase();
    const expectedFileNameLowerCase = expectedFileName.toLowerCase();

    if (!fileName.endsWith('.json') || fileName !== expectedFileNameLowerCase) {
      alert(`Please upload a valid ${expectedFileName} file.`);
      inputElement.value = '';  // Clear the input field
    }
  }
}

function compareFiles() {
  const file1Input = document.getElementById('file1Input');
  const file2Input = document.getElementById('file2Input');

  const file1 = file1Input.files[0];
  const file2 = file2Input.files[0];

  if (file1 && file2) {
    // Use FileReader to read the content of the files
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e1) {
      reader2.onload = function (e2) {
        const file1Content = e1.target.result;
        const file2Content = e2.target.result;

        // Perform the comparison using the provided function
        const notInFollowers = compareFollowersAndFollowing(file1Content, file2Content);

        const olElement = document.createElement('ol');
        notInFollowers.forEach(unfollower => {
          const liElement = document.createElement('li');
          liElement.innerHTML = `<a href="${unfollower.href}" target="_blank">${unfollower.value}</a>`;
          olElement.appendChild(liElement);
        });

        displayEl.appendChild(olElement);

        // Output the result
        console.log('Entries present in following but not in followers:', notInFollowers);
        alert('Comparison completed successfully! Results will be printed on the screen soon.');
      };

      reader2.readAsText(file2);
    };

    reader1.readAsText(file1);
  } else {
    alert('Please select both files.');
  }
}

function compareFollowersAndFollowing(file1Content, file2Content) {
  const followersData = JSON.parse(file1Content);
  const followingData = JSON.parse(file2Content);

  // Extract usernames and href from followers and following
  const followersInfo = followersData.map(entry => ({ value: entry.string_list_data[0]?.value, href: entry.string_list_data[0]?.href }));
  const followingInfo = followingData.relationships_following.map(entry => ({ value: entry.string_list_data[0]?.value, href: entry.string_list_data[0]?.href }));

  // Find entries in following but not in followers
  return followingInfo.filter(followingEntry =>
    !followersInfo.some(followerEntry => followerEntry.value === followingEntry.value)
  );
}