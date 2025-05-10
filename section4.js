// Get the button element
const mainButton = document.getElementById('mainButton');
    
// Add click event listener
mainButton.addEventListener('click', function() {
  // Create a function to download the current page
  function downloadPage() {
    // Create a blob from the HTML content
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], {type: 'text/html'});
    
    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a link element and set its attributes
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'do_u_like_this_file.html';
    
    // Append to body, click programmatically, then remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Revoke the blob URL to free up memory
    window.URL.revokeObjectURL(url);
    
    // Navigate to main.html after a short delay
    setTimeout(function() {
      window.location.href = 'main.html';
    }, 100);
  }
  
  // Start the download and navigation
  downloadPage();
});