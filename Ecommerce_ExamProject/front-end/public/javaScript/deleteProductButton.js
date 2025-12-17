async function softDelete(productId, currentDeletedStatus) {
    const newDeletedStatus = !currentDeletedStatus;
try {
    const response = await fetch(`http://localhost:3002/products/softDelete/${productId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleted: newDeletedStatus })
    });

    if(response.ok) {
        alert(`Product ${newDeletedStatus ? 'deleted' : 'restored' }!`)
        
    } else {
        alert('Failed to update product status.')
    }
    } catch (err) {
        console.log('Error: ', err);
        alert('Error updating product status')
    }
    try{
        const resp = await fetch(`http://localhost:3002/products`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json'
            }
        });

        const data = await resp.json();
        const products = data.data.result

        const tbody = document.getElementById('productsTableContent');
        tbody.innerHTML = '';

        products.forEach(product => {
          const tr = document.createElement('tr');
          tr.setAttribute('data-product-id', product.id);

          tr.innerHTML = `
            <td>${product.id}</td>
            <td class="product-category">${product.category}</td>
            <td class="product-brand">${product.brand}</td>
            <td class="product-imgurl">
              ${product.imgurl && product.imgurl.startsWith('http') ? `<img src="${product.imgurl}" style="max-width:80px;max-height:80px;"/>` : ''}
            </td>
            <td class="product-name">${product.name}</td>
            <td class="product-description">${product.description}</td>
            <td class="product-price">${product.price}</td>
            <td class="product-quantity">${product.quantity}</td>
            <td class="product-date-added">${product.date_added ? product.date_added.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="product-deleted">${product.deleted ? 'Yes' : 'No'}</td>
            <td class="short-date">${product.createdAt ? product.createdAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td class="short-date">${product.updatedAt ? product.updatedAt.slice(0, 10).split('-').reverse().join('/') : ''}</td>
            <td> 
              <button class="btn btn-warning btn-sm mx-1" id="deleteProduct"
                onclick="softDelete('${product.id}', ${product.deleted})"
                >Delete/Restore
              </button>
              <button class="btn btn-danger btn-sm mx-1"
                onclick="openProductModal(JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(product))}')))">
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
        }catch (err){
          console.log(err);
        }
}

