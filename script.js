// API URL
const API_URL = 'https://i48zy8p9vl.execute-api.us-east-1.amazonaws.com/prod/';

// Fetch and display the issues
async function fetchIssues() {
  try {
    const response = await fetch(API_URL);
    const issues = await response.json();
    
    // Clear the existing list
    const issueList = document.getElementById('issueList');
    issueList.innerHTML = '';

    // Add issues to the list
    issues.forEach((issue) => {
      const issueItem = document.createElement('li');
      issueItem.className = 'list-group-item';
      issueItem.innerHTML = `
        <strong>Title:</strong> ${issue.issueTitle}<br>
        <strong>Description:</strong> ${issue.issueDescription}<br>
        <strong>Resolution:</strong> ${issue.resolutionSteps || 'N/A'}<br>
        <strong>Created By:</strong> ${issue.createdBy}<br>
        <strong>Created At:</strong> ${issue.createdAt}
      `;
      issueList.appendChild(issueItem);
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    alert('Failed to fetch issues');
  }
}

// Add a new issue
async function addIssue(event) {
  event.preventDefault();

  // Get form data
  const issueTitle = document.getElementById('issueTitle').value;
  const issueDescription = document.getElementById('issueDescription').value;
  const resolutionSteps = document.getElementById('resolutionSteps').value;
  const createdBy = document.getElementById('createdBy').value;

  const issue = {
    issueTitle,
    issueDescription,
    resolutionSteps,
    createdBy,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issue),
    });

    if (!response.ok) {
      throw new Error('Failed to add issue');
    }

    const result = await response.json();
    alert(result.message);

    // Clear form fields
    document.getElementById('addIssueForm').reset();

    // Refresh the issues list
    fetchIssues();
  } catch (error) {
    console.error('Error adding issue:', error);
    alert('Failed to add issue');
  }
}

// Event Listeners
document.getElementById('addIssueForm').addEventListener('submit', addIssue);

// Initial Fetch
fetchIssues();
