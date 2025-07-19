document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginBox = document.querySelector(".right-login");

  loginBtn.addEventListener("click", () => {
    // Print message
    console.log("Login button clicked!");

    // Toggle login box visibility
    if (loginBox.style.display === "none" || loginBox.style.display === "") {
      loginBox.style.display = "block";
    } else {
      loginBox.style.display = "none";
    }
  });
});

// Search logic
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim(); //takes text from search box and stores it in a variable called query
  if (!query) return; //if no query, return

  fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`) //if there's query, it sends to the backend
    .then(res => res.json()) //Once the server replies with results, this line converts that response into usable JavaScript data (JSON)
    .then(data => { //This calls a function named renderQuestions() to show the results on your page, like adding new question cards to the screen
      renderQuestions(data);
    })
    .catch(err => {
      console.error('Search request failed:', err); //If something goes wrong (like server is down or no internet), it shows an error in the console
    });
}

// Optional: Trigger search on "Enter" key press
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
});

//Dynamically render questions in the DOM
function renderQuestions(data) {
  const leftFeed = document.querySelector('.left-feed');   // Find the container where questions will be shown
  leftFeed.innerHTML = ''; // Clear any existing content (old questions)

  if (!data || data.length === 0) {  // If no questions found or empty array
    const noResults = document.createElement('p');  // Create a paragraph element
    noResults.className = 'no-results';       
    leftFeed.appendChild(noResults);                        // Add this message to the container
    return;                                                 // Exit the function early
  }

  data.forEach(question => {                                // For each question in the data array
    const card = document.createElement('div');             // Create a new div for the question card
    card.className = 'question-card';                        // Add CSS class for styling

    // Fill the card with question title, details (hidden initially), and buttons
    card.innerHTML = `
      <h3>${question.title}</h3>
      <div class="question-detail" style="display:none;">
        <p>${question.detail}</p>
      </div>
      <button class="toggle-detail">Toggle Details</button>
      <button class="answer-btn">Answer</button>
    `;

    // Add click listener to toggle the visibility of the details section
    card.querySelector('.toggle-detail').addEventListener('click', () => {
      const detail = card.querySelector('.question-detail');
      detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    });

    leftFeed.appendChild(card);                             // Add the question card to the container in the DOM
  });
}



