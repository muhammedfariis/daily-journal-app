document.querySelector(".forms").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number, email, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
      window.location.href = "login.html";
    }
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
});



