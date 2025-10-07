const API_URL = "http://localhost:8000/api/entries";

// Fetch and display entries
async function fetchEntries() {
  const token = localStorage.getItem("token");
  const entriesDiv = document.getElementById("entries");

  if (!token) {
    entriesDiv.innerHTML = '<p>Please log in to view your journal history.</p>';
    return;
  }

  try {
    // ✅ Send token in Authorization header
    const res = await fetch(API_URL, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (res.status === 401) {
      entriesDiv.innerHTML = '<p>Session expired. Please log in again.</p>';
      localStorage.removeItem("token");
      return;
    }

    const entries = await res.json();

    entriesDiv.innerHTML = "";

    if (entries.length === 0) {
      entriesDiv.innerHTML = '<p>You have no entries yet. Go write one!</p>';
      return;
    }

    entries.forEach(entry => {
      const div = document.createElement("div");
      div.className = "entry";
      div.innerHTML = `
        <h3>${entry.title} 
          <button class="delete-btn" onclick="deleteEntry('${entry._id}')">Delete</button>
        </h3>
        <p>${entry.content}</p>
        <small>${new Date(entry.date).toLocaleString()}</small>
      `;
      entriesDiv.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
    entriesDiv.innerHTML = `<p>Error loading history: ${error.message}</p>`;
  }
}

async function deleteEntry(id) {
  const token = localStorage.getItem("token");
  if (!token || !confirm("Are you sure you want to delete this entry?")) return;

  try {
    // ✅ Send token in Authorization header
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (res.status === 404) {
      alert("Entry not found or unauthorized to delete.");
      fetchEntries();
      return;
    }

    fetchEntries(); // refresh entries
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

// Initial fetch
fetchEntries();
