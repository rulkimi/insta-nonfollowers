const { exec } = require('child_process');

// Define the scripts to run
const scripts = [
  'followers-db.js',
  'following-db.js',
  'server.js',
  'add-to-txt.js'
];

// Function to run scripts sequentially
function runScripts(index) {
  if (index < scripts.length) {
    const script = scripts[index];
    console.log(`Running script: ${script}`);

    // Use exec to run the script
    const child = exec(`node ${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error in script ${script}: ${error.message}`);
        return;
      }
      console.log(`Script ${script} executed successfully.`);
      
      // Run the next script recursively
      runScripts(index + 1);
    });

    // Forward the child process output to the main process
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }
}

// Start running scripts from index 0
runScripts(0);
