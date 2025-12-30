//Refactored and debugged using Copilot
let currentUser = null;
async function openUserModal(user) {
  currentUser = user.id;
  document.getElementById("modalUserId").value = user.id;
  document.getElementById("modalUserFirstName").value = user.firstname;
  document.getElementById("modalUserLastName").value = user.lastname;
  document.getElementById("modalUserUsername").value = user.username;
  document.getElementById("modalUserEmail").value = user.email;
  document.getElementById("modalUserAddress").value = user.address;
  document.getElementById("modalUserTelephone").value = user.telephone;

  var modal = new bootstrap.Modal(document.getElementById("userModal"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", function () {
  window.openUserModal = openUserModal;

  const editForm = document.getElementById("userEditForm");
  if (editForm) {
    editForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const updatedUser = {
        id: document.getElementById("modalUserId").value,
        firstname: document.getElementById("modalUserFirstName").value,
        lastname: document.getElementById("modalUserLastName").value,
        username: document.getElementById("modalUserUsername").value,
        email: document.getElementById("modalUserEmail").value,
        address: document.getElementById("modalUserAddress").value,
        telephone: document.getElementById("modalUserTelephone").value,
      };
      try {
        const response = await fetch(`/api/users/${currentUser}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await fetch(`/api/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await response.json();
        const users = data.data.result;

        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = "";

        for (const item of users) {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${item.id}</td>
              <td>${item.firstname}</td>
              <td>${item.lastname}</td>
              <td>${item.username}</td>
              <td>${item.email}</td>
              <td>${item.address}</td>
              <td>${item.telephone}</td>
              <td class="short-date">${
                users.createdAt
                  ? users.createdAt.slice(0, 10).split("-").reverse().join("/")
                  : ""
              }</td>
              <td class="short-date">${
                users.updatedAt
                  ? users.updatedAt.slice(0, 10).split("-").reverse().join("/")
                  : ""
              }</td>
              <td>
                  <button class="btn btn-warning btn-sm mx-1"
                    onclick="deleteUser('/users', '${
                      users.id
                    }')">Delete</button>
                  <button class="btn btn-danger btn-sm mx-1"
                    onclick="openUserModal(JSON.parse(decodeURIComponent('${encodeURIComponent(
                      JSON.stringify(users)
                    )}')))">
                    Edit
                  </button>
              </td>
            `;
          tbody.appendChild(tr);
        }
        if (response.ok) {
          var modalInstance = bootstrap.Modal.getInstance(
            document.getElementById("userModal")
          );
          if (modalInstance) modalInstance.hide();
          location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
});
