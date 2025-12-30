async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        document.cookie = `token=${data.token}; path=/;`;
        window.location.href = "/";
      } else {
        alert("Login failed");
      }
    });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

async function logout() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.href = "/login";
}
