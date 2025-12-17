function updateSpecies(baseUrl, id) {
  const newName = prompt("Enter the new species name:");
  if (newName) {
    fetch(`${baseUrl}/species`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id: id,
        SpeciesInput: newName,
        PostType: "updateSpecies",
      }),
    }).then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to update species.");
      }
    });
  }
}

async function addSpecies(url) {
  let id = prompt("Add Species");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Id: id,
      SpeciesInput: "non",
      PostType: "newSpecies",
    }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created new species";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

async function deleteSpecies(url, DeleteSpec) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      DeleteSpec: DeleteSpec,
      PostType: "deleteSpec",
    }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created new species";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

async function updateTemperament(url, TempId) {
  let temperamentInput = prompt("Update Temperament");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      TempId: TempId,
      Temperament: temperamentInput,
      PostType: "updateTemperament",
    }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created new table content";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

async function adoptAnimal(url, animalId) {
  try {
    const response = await fetch(url + "/adopt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animalId }),
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to adopt animal");
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

async function cancelAdoption(url, animalId) {
  try {
    const response = await fetch(url + "/cancel-adoption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animalId }),
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to cancel adoption");
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

async function addTemperament(url) {
  let id = prompt("Add Temperament");
  await fetch(url, {
    method: "UPDATE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Id: id,
      PostType: "newTemperament",
    }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created new species";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

async function deleteTemperament(url, DeleteTemp) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      DeleteTemp: DeleteTemp,
      PostType: "deleteTemp",
    }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created new species";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

async function populateDatabase(url) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created new table content";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
  alert("Data added to database.");
}

async function allAnimals() {
  try {
    const response = await fetch("/animals/all", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch all animals: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();

    // Build new table rows for all animals
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((animal) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${animal.id}</td>
                <td>${animal.Name}</td>
                <td>${animal.Species}</td>
                <td>${animal.Birthday}</td>
                <td>${animal.Temperament}</td>
                <td>${animal.Size}</td>
                <td>${animal.Age}</td>
                <td>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch"
                    id="adoptedSwitch-${animal.id}"
                    ${animal.Adopted == 1 ? "checked" : ""}
                    disabled
                    >
                </div>
                </td>
                <td>
                  <button class="btn btn-warning btn-sm mx-1" onclick="adoptAnimal('/animals', '${animal.id}')">Adopt</button>
                  <button class="btn btn-danger btn-sm mx-1" onclick="cancelAdoption('/animals', '${animal.id}')">Cancel Adoption</button>
                </td>
            `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

async function popularNames() {
  try {
    const response = await fetch("/animals/popular_names", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch popular names: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();

    // Build new table rows for popular names
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td colspan="2"></td>
                <td>${item.Name}</td>
                <td colspan="3"></td>
                <td>Count: ${item.count}</td>
                <td colspan="2"></td>
            `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

function adoptionDetails() {
  alert("All Adoption Details button clicked!");
  // TODO: Implement fetch and display logic
}

async function byAge() {
  try {
    const response = await fetch("/animals/age", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch animals by age: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();

    // Build new table rows for animals by age
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((animal) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${animal.id}</td>
                <td>${animal.Name}</td>
                <td>${animal.Species}</td>
                <td>${animal.Birthday}</td>
                <td>${animal.Temperament}</td>
                <td>${animal.Size}</td>
                <td>${animal.Age}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch"
                        id="adoptedSwitch-${animal.id}"
                        ${animal.Adopted == 1 ? "checked" : ""}
                        disabled
                        >
                    </div>
                </td>
                <td>
                  <button class="btn btn-warning btn-sm mx-1" onclick="adoptAnimal('/animals', '${animal.id}')">Adopt</button>
                  <button class="btn btn-danger btn-sm mx-1" onclick="cancelAdoption('/animals', '${animal.id}')">Cancel Adoption</button>
                </td>
            `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

function dateRange() {
  alert("Animals Born In Date Range button clicked!");
  // TODO: Implement fetch and display logic
}

async function bySize() {
  try {
    const response = await fetch("/animals/size", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch animals by size: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();

    // Build new table rows for animals by size
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((animal) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${animal.id}</td>
                <td>${animal.Name}</td>
                <td>${animal.Species}</td>
                <td>${animal.Birthday}</td>
                <td>${animal.Temperament}</td>
                <td>${animal.Size}</td>
                <td>${animal.Age}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch"
                        id="adoptedSwitch-${animal.id}"
                        ${animal.Adopted == 1 ? "checked" : ""}
                        disabled
                        >
                    </div>
                </td>
                <td>
                  <button class="btn btn-warning btn-sm mx-1" onclick="adoptAnimal('/animals', '${animal.id}')">Adopt</button>
                  <button class="btn btn-danger btn-sm mx-1" onclick="cancelAdoption('/animals', '${animal.id}')">Cancel Adoption</button>
                </td>
            `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}
