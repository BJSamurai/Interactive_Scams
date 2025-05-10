document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const fileInput = document.getElementById('file-input');
    const selectFileBtn = document.getElementById('select-file-btn');
    const processBtn = document.getElementById('process-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const fileName = document.getElementById('file-name');
    const fileInfo = document.getElementById('file-info');
    const linkCount = document.getElementById('link-count');
    const resultSection = document.getElementById('result-section');
    const uploadSection = document.getElementById('upload-section');
    const dropArea = document.getElementById('drop-area');
    
    // Variables to store file data
    let uploadedFile = null;
    let modifiedContent = null;
    let modifiedFileName = null;
    
    // Event Listeners
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    processBtn.addEventListener('click', processFile);
    downloadBtn.addEventListener('click', downloadModifiedFile);
    resetBtn.addEventListener('click', resetApp);
    
    // Drag and drop support
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    // Functions
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        uploadSection.classList.add('drag-over');
    }
    
    function unhighlight() {
        uploadSection.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length === 1 && (files[0].type === 'text/html' || files[0].name.endsWith('.html') || files[0].name.endsWith('.htm'))) {
            handleFiles(files);
        } else {
            alert('Please drop a single HTML file.');
        }
    }
    
    function handleFiles(files) {
        uploadedFile = files[0];
        displayFileInfo();
    }
    
    function handleFileSelect(e) {
        if (e.target.files.length > 0) {
            uploadedFile = e.target.files[0];
            displayFileInfo();
        }
    }
    
    function displayFileInfo() {
        fileName.textContent = uploadedFile.name;
        fileInfo.classList.remove('hidden');
    }
    
    function processFile() {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const htmlContent = e.target.result;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            // Replace all href attributes with baidu.com
            const links = doc.querySelectorAll('a');
            let replacedCount = 0;
            
            links.forEach(link => {
                if (link.hasAttribute('href')) {
                    link.setAttribute('href', 'https://www.merriam-webster.com/dictionary/scam');
                    replacedCount++;
                }
            });
            
            // Generate modified HTML
            modifiedContent = new XMLSerializer().serializeToString(doc);
            
            // Create the modified file name
            const originalName = uploadedFile.name;
            const nameParts = originalName.split('.');
            const extension = nameParts.pop();
            modifiedFileName = nameParts.join('.') + '-modified.' + extension;
            
            // Show results
            linkCount.textContent = replacedCount;
            uploadSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        };
        
        reader.readAsText(uploadedFile);
    }
    
    function downloadModifiedFile() {
        const blob = new Blob([modifiedContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = modifiedFileName;
        
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
    
    function resetApp() {
        // Reset variables
        uploadedFile = null;
        modifiedContent = null;
        modifiedFileName = null;
        
        // Reset UI
        fileInput.value = '';
        fileName.textContent = '';
        fileInfo.classList.add('hidden');
        resultSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
    }
});