export const $viewport = {
  isMobileView: () => window.innerWidth <= 767,
  isMobileAndTabletView: () => window.innerWidth <= 1024,
};

// Function to handle viewport change
function handleViewportChange() {
  console.log('Is Mobile View:', $viewport.isMobileView());
  console.log('Is Mobile and Tablet View:', $viewport.isMobileAndTabletView());
}

// Event listener for viewport change
window.addEventListener('resize', handleViewportChange);

// Initial check on page load
window.addEventListener('load', handleViewportChange);
