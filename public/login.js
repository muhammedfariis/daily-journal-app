document.querySelector(".forms").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Safely parse response
    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      alert("Server returned non-JSON response: " + text);
      return;
    }

    // Handle error or success
    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    alert(data.message || "Login successful!");

    if (data.token) {
      // Save token for future API requests
      localStorage.setItem("token", data.token);
      window.location.href = "home.html"; // redirect after login
    }
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});
