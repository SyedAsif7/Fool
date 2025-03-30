// Admin password
const ADMIN_PASSWORD = "april01"; // Change this to your desired password

// Function to show admin login
function showAdminLogin() {
    document.getElementById('adminModal').style.display = 'block';
    document.getElementById('adminLoginForm').style.display = 'block';
    document.getElementById('adminContent').style.display = 'none';
    document.getElementById('adminError').style.display = 'none';
    document.getElementById('adminPassword').value = ''; // Clear password field
}

// Function to check admin password
function checkAdminPassword() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('adminLoginForm').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        updateAdminPanel();
    } else {
        document.getElementById('adminError').style.display = 'block';
        document.getElementById('adminPassword').value = ''; // Clear password field
    }
}

// Function to save result check
function saveResultCheck(name, prn) {
    let checks = JSON.parse(localStorage.getItem('resultChecks') || '[]');
    // Add new check at the beginning of the array
    checks.unshift({
        name: name,
        prn: prn,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('resultChecks', JSON.stringify(checks));
    updateAdminPanel();
}

// Function to update admin panel
function updateAdminPanel() {
    const checks = JSON.parse(localStorage.getItem('resultChecks') || '[]');
    const resultList = document.getElementById('resultList');
    
    if (checks.length === 0) {
        resultList.innerHTML = '<li class="no-history">No result check history found</li>';
        return;
    }

    resultList.innerHTML = checks.map((check, index) => `
        <li class="result-item">
            <button class="delete-btn" onclick="deleteHistory(${index})" title="Delete entry">🗑️</button>
            <p><strong>Name:</strong> ${check.name}</p>
            <p><strong>PRN:</strong> ${check.prn}</p>
            <p class="timestamp">${check.timestamp}</p>
        </li>
    `).join('');
}

// Function to delete specific history entry
function deleteHistory(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        let checks = JSON.parse(localStorage.getItem('resultChecks') || '[]');
        checks.splice(index, 1);
        localStorage.setItem('resultChecks', JSON.stringify(checks));
        updateAdminPanel();
    }
}

// Function to hide admin panel
function hideAdminPanel() {
    document.getElementById('adminModal').style.display = 'none';
    document.getElementById('adminPassword').value = ''; // Clear password field
}

// Function to show custom alert
function showAlert() {
    document.getElementById('alertModal').style.display = 'block';
}

// Function to hide custom alert
function hideAlert() {
    document.getElementById('alertModal').style.display = 'none';
}

// Modified checkResult function
function checkResult() {
    var username = document.getElementById('username').value.trim();
    var prn = document.getElementById('prn').value.trim();

    if (username === "" || prn === "") {
        alert("Please fill in all required fields");
        return;
    }

    // PRN validation
    if (!/^\d+$/.test(prn) || prn.length < 12 || prn.length > 14) {
        alert("Invalid PRN");
        return;
    }

    // Save the result check
    saveResultCheck(username, prn);

    document.getElementById('loader').style.display = "block";
    document.getElementById('result').innerHTML = "";

    const loadingMessages = [
        { time: 2000, message: "Verifying student credentials..." },
        { time: 4000, message: "Accessing examination database..." },
        { time: 6000, message: "Calculating final scores..." },
        { time: 8000, message: "Generating result document..." },
        { time: 10000, message: "Preparing final output..." }
    ];

    loadingMessages.forEach(({ time, message }) => {
        setTimeout(() => {
            document.getElementById('loadingText').innerText = message;
        }, time);
    });

    setTimeout(() => {
        document.getElementById('loader').style.display = "none";
        document.getElementById('result').innerHTML = "";
        showAlert();
    }, 12000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('adminModal');
    const alertModal = document.getElementById('alertModal');
    if (event.target == modal) {
        hideAdminPanel();
    }
    if (event.target == alertModal) {
        hideAlert();
    }
}

// Show admin panel by default
window.onload = function() {
    document.getElementById('adminPanel').style.display = 'block';
} 