//Refactored and debugged using Copilot
async function handleBrandChange() {
  const selectedBrand = document.getElementById('selectedBrand').value;
  if (selectedBrand === '') {
    try {
      const response = await fetch('http://localhost:3002/brands', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      const data = await response.json();
      const brands = data.data.result;
      
      const table = document.querySelector('table');
      table.innerHTML = 
      `<thead>
        <tr>
          <th scope ="col">Id</th>
          <th scope ="col">Caterory</th>
          <th scope ="col">Brand</th>
          <th scope ="col">Image</th>
          <th scope ="col">Membership</th>
          <th scope ="col">Name</th>
          <th scope ="col">Description</th>
          <th scope ="col">Price</th>
          <th scope ="col">Quantity</th>
          <th scope ="col">Date Added</th>
          <th scope ="col">Is Deleted</th>
          <th scope ="col">Created At</th>
          <th scope ="col">Updated At</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      `;
      
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

        for (const item of brands) {         
          const tr = document.createElement('tr');
          let adminButtons = '';
          let addButton = '';

          if (window.currentUser && window.currentUser.username === "Admin") {
            adminButtons = `
            <button class="btn btn-warning btn-sm mx-1"
                onclick="softDelete('${item.id}', ${item.deleted})">
                Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(item))}')))">
                Edit
              </button>
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
               `;
            } else if (window.currentUser && window.currentUser.username){
              addButton = `
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
              `;
            }
          
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td><img src='${item.imgurl}' alt='${item.name}' style="max-width:80px;max-height:80px;"/></td>
            <th>${window.currentUser && window.currentUser.membershipName ? window.currentUser.membershipName : ''}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td class="short-date">${item.date_added ? item.date_added.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>${item.deleted ? 'Yes' : 'No'}</td>
            <td class="short-date">${item.createdAt ? item.createdAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="short-date">${item.updatedAt ? item.updatedAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>
              ${adminButtons} 
              ${addButton}         
            </td>
          `;
          tbody.appendChild(tr);
        };
       
    } catch (err){
      console.log (err);
    }    
  }

  if (selectedBrand === 'Apple') {
    try {
      const response = await fetch('http://localhost:3002/brands/apple', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      const data = await response.json();
      const apple = data.data.result;
      
      const table = document.querySelector('table');
      table.innerHTML = 
      `<thead>
        <tr>
          <th scope ="col">Id</th>
          <th scope ="col">Caterory</th>
          <th scope ="col">Brand</th>
          <th scope ="col">Image</th>
          <th scope ="col">Membership</th>
          <th scope ="col">Name</th>
          <th scope ="col">Description</th>
          <th scope ="col">Price</th>
          <th scope ="col">Quantity</th>
          <th scope ="col">Date Added</th>
          <th scope ="col">Is Deleted</th>
          <th scope ="col">Created At</th>
          <th scope ="col">Updated At</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      `;

      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

      for (const item of apple) {         
          const tr = document.createElement('tr');
          let adminButtons = '';
          let addButton = '';

          if (window.currentUser && window.currentUser.username === "Admin") {
            adminButtons = `
            <button class="btn btn-warning btn-sm mx-1"
                onclick="softDelete('${item.id}', ${item.deleted})">
                Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(item))}')))">
                Edit
              </button>
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
               `;
            }else if (window.currentUser && window.currentUser.username){
              addButton = `
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
              `;
            }
          
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td><img src='${item.imgurl}' alt='${item.name}' style="max-width:80px;max-height:80px;"/></td>
            <th>${window.currentUser && window.currentUser.membershipName ? window.currentUser.membershipName : ''}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td class="short-date">${item.date_added ? item.date_added.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>${item.deleted ? 'Yes' : 'No'}</td>
            <td class="short-date">${item.createdAt ? item.createdAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="short-date">${item.updatedAt ? item.updatedAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>
              ${adminButtons} 
              ${addButton}         
            </td>
          `;
          tbody.appendChild(tr);
        };
       
    } catch (err) {
      console.log(err);
    }
  }

  if(selectedBrand === 'Samsung'){
        try {
      const response = await fetch('http://localhost:3002/brands/samsung', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      const data = await response.json();
      const samsung = data.data.result;

      const table = document.querySelector('table');
      table.innerHTML = 
      `<thead>
        <tr>
          <th scope ="col">Id</th>
          <th scope ="col">Caterory</th>
          <th scope ="col">Brand</th>
          <th scope ="col">Image</th>
          <th scope ="col">Membership</th>
          <th scope ="col">Name</th>
          <th scope ="col">Description</th>
          <th scope ="col">Price</th>
          <th scope ="col">Quantity</th>
          <th scope ="col">Date Added</th>
          <th scope ="col">Is Deleted</th>
          <th scope ="col">Created At</th>
          <th scope ="col">Updated At</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      `;
      
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

      for (const item of samsung) {         
          const tr = document.createElement('tr');
          let adminButtons = '';
          let addButton = '';

          if (window.currentUser && window.currentUser.username === "Admin") {
            adminButtons = `
            <button class="btn btn-warning btn-sm mx-1"
                onclick="softDelete('${item.id}', ${item.deleted})">
                Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(item))}')))">
                Edit
              </button>
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
               `;
            }else if (window.currentUser && window.currentUser.username){
              addButton = `
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
              `;
            }
          
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td><img src='${item.imgurl}' alt='${item.name}' style="max-width:80px;max-height:80px;"/></td>
            <th>${window.currentUser && window.currentUser.membershipName ? window.currentUser.membershipName : ''}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td class="short-date">${item.date_added ? item.date_added.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>${item.deleted ? 'Yes' : 'No'}</td>
            <td class="short-date">${item.createdAt ? item.createdAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="short-date">${item.updatedAt ? item.updatedAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>
              ${adminButtons} 
              ${addButton}         
            </td>
          `;
          tbody.appendChild(tr);
        };
       
    } catch (err) {
      console.log(err);
    }
  }

  if (selectedBrand === "Xiaomi"){
    try {
      const response = await fetch('http://localhost:3002/brands/xiaomi', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      const data = await response.json();
      const xiaomi = data.data.result;
      
      const table = document.querySelector('table');
      table.innerHTML = 
      `<thead>
        <tr>
          <th scope ="col">Id</th>
          <th scope ="col">Caterory</th>
          <th scope ="col">Brand</th>
          <th scope ="col">Image</th>
          <th scope ="col">Membership</th>
          <th scope ="col">Name</th>
          <th scope ="col">Description</th>
          <th scope ="col">Price</th>
          <th scope ="col">Quantity</th>
          <th scope ="col">Date Added</th>
          <th scope ="col">Is Deleted</th>
          <th scope ="col">Created At</th>
          <th scope ="col">Updated At</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      `;

      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

      for (const item of xiaomi) {         
          const tr = document.createElement('tr');
          let adminButtons = '';
          let addButton = '';

          if (window.currentUser && window.currentUser.username === "Admin") {
            adminButtons = `
            <button class="btn btn-warning btn-sm mx-1"
                onclick="softDelete('${item.id}', ${item.deleted})">
                Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(item))}')))">
                Edit
              </button>
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
               `;
            }else if (window.currentUser && window.currentUser.username){
              addButton = `
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
              `;
            }
          
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td><img src='${item.imgurl}' alt='${item.name}' style="max-width:80px;max-height:80px;"/></td>
            <th>${window.currentUser && window.currentUser.membershipName ? window.currentUser.membershipName : ''}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td class="short-date">${item.date_added ? item.date_added.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>${item.deleted ? 'Yes' : 'No'}</td>
            <td class="short-date">${item.createdAt ? item.createdAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="short-date">${item.updatedAt ? item.updatedAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>
              ${adminButtons} 
              ${addButton}         
            </td>
          `;
          tbody.appendChild(tr);
        };
       
    } catch (err) {
      console.log(err);
    }
  }

  if(selectedBrand === 'MXQ'){
    try {
      const response = await fetch('http://localhost:3002/brands/mxq', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      const data = await response.json();
      const mxq = data.data.result;

      const table = document.querySelector('table');
      table.innerHTML = 
      `<thead>
        <tr>
          <th scope ="col">Id</th>
          <th scope ="col">Caterory</th>
          <th scope ="col">Brand</th>
          <th scope ="col">Image</th>
          <th scope ="col">Membership</th>
          <th scope ="col">Name</th>
          <th scope ="col">Description</th>
          <th scope ="col">Price</th>
          <th scope ="col">Quantity</th>
          <th scope ="col">Date Added</th>
          <th scope ="col">Is Deleted</th>
          <th scope ="col">Created At</th>
          <th scope ="col">Updated At</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      `;
      
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

      for (const item of mxq) {         
          const tr = document.createElement('tr');
          let adminButtons = '';
          let addButton = '';

          if (window.currentUser && window.currentUser.username === "Admin") {
            adminButtons = `
            <button class="btn btn-warning btn-sm mx-1"
                onclick="softDelete('${item.id}', ${item.deleted})">
                Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(item))}')))">
                Edit
              </button>
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
               `;
            }else if (window.currentUser && window.currentUser.username){
              addButton = `
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${item.id}')">
                Add
              </button>
              `;
            }
          
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td><img src='${item.imgurl}' alt='${item.name}' style="max-width:80px;max-height:80px;"/></td>
            <th>${window.currentUser && window.currentUser.membershipName ? window.currentUser.membershipName : ''}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td class="short-date">${item.date_added ? item.date_added.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>${item.deleted ? 'Yes' : 'No'}</td>
            <td class="short-date">${item.createdAt ? item.createdAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="short-date">${item.updatedAt ? item.updatedAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td>
              ${adminButtons} 
              ${addButton}         
            </td>
          `;
          tbody.appendChild(tr);
        };
        
    } catch (err) {
      console.log(err);
    }
  }
  //Initialized using Copilot 
  if (window.setupImageZoom) {
    window.setupImageZoom();
  }
}; 