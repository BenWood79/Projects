//Refactored and debugged using Copilot
let currentProduct = null;
async function openProductModal(product) {
  currentProduct = product.id;
  document.getElementById("modalProductId").value = product.id;
  document.getElementById("modalProductCategory").value = product.category;
  document.getElementById("modalProductBrand").value = product.brand;
  document.getElementById("modalProductImgurl").value = product.imgurl;
  document.getElementById("modalProductName").value = product.name;
  document.getElementById("modalProductDescription").value =
    product.description;
  document.getElementById("modalProductPrice").value = product.price;
  document.getElementById("modalProductQuantity").value = product.quantity;
  document.getElementById("modalProductDateAdded").value = product.date_added
    ? product.date_added.slice(0, 10)
    : "";
  document.getElementById("modalProductDeleted").checked = !!product.deleted;
  var modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", function () {
  window.openProductModal = openProductModal;

  const editForm = document.getElementById("productEditForm");
  if (editForm) {
    editForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const updatedProduct = {
        id: document.getElementById("modalProductId").value,
        category: document.getElementById("modalProductCategory").value,
        brand: document.getElementById("modalProductBrand").value,
        imgurl: document.getElementById("modalProductImgurl").value,
        name: document.getElementById("modalProductName").value,
        description: document.getElementById("modalProductDescription").value,
        price: document.getElementById("modalProductPrice").value,
        quantity: document.getElementById("modalProductQuantity").value,
        date_added: document.getElementById("modalProductDateAdded").value,
        deleted: document.getElementById("modalProductDeleted").checked,
      };
      try {
        const response = await fetch(`/api/products/${currentProduct}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });
      } catch (err) {
        console.log(err);
      }

      try {
        const resp = await fetch(`/api/products`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await resp.json();
        const products = data.data.result;

        const tbody = document.getElementById("productsTableContent");
        tbody.innerHTML = "";

        products.forEach((product) => {
          const tr = document.createElement("tr");
          tr.setAttribute("data-product-id", product.id);

          tr.innerHTML = `
            <td>${product.id}</td>
            <td class="product-category">${product.category}</td>
            <td class="product-brand">${product.brand}</td>
            <td class="product-imgurl">
              ${
                product.imgurl && product.imgurl.startsWith("http")
                  ? `<img src="${product.imgurl}" style="max-width:80px;max-height:80px;"/>`
                  : ""
              }
            </td>
            <td class="product-name">${product.name}</td>
            <td class="product-description">${product.description}</td>
            <td class="product-price">${product.price}</td>
            <td class="product-quantity">${product.quantity}</td>
            <td class="product-date-added">${
              product.date_added
                ? product.date_added.slice(0, 10).split("-").reverse().join("/")
                : ""
            }</td>
            <td class="product-deleted">${product.deleted ? "Yes" : "No"}</td>
            <td class="short-date">${
              product.createdAt
                ? product.createdAt.slice(0, 10).split("-").reverse().join("/")
                : ""
            }</td>
            <td class="short-date">${
              product.updatedAt
                ? product.updatedAt.slice(0, 10).split("-").reverse().join("/")
                : ""
            }</td>
            <td> 
              <button class="btn btn-warning btn-sm mx-1" id="deleteProduct"
                onclick="softDelete('${product.id}', ${product.deleted})"
                >Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(
                  JSON.stringify(product)
                )}')))">
                Edit
              </button>
              <button class="btn btn-sm bg-success"
                onclick="addToCart('/products', '${product.id}')">
                Add
              </button>
            </td>
          `;
          tbody.appendChild(tr);
          location.reload();
        });
        window.setupImageZoom();
      } catch (err) {
        console.log(err);
      }
    });
  }
});
