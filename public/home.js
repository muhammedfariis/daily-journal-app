// /public/script.js

document.getElementById("journalForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const token = localStorage.getItem("token"); // get token from login

  if (!token) {
    alert("Please log in first!");
    window.location.href = "login.html"; // redirect if not logged in
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token   // ✅ crucial for backend auth
      },
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Entry submission failed");
      return;
    }

    alert("Entry added successfully!");
    document.getElementById("journalForm").reset();

    // Redirect to history page after submit
    window.location.href = "journals.html";
  } catch (err) {
    console.error("Error adding entry:", err);
    alert("Entry submission failed: " + err.message);
  }
});
