async function addToCart(product) {
  const response = await fetch('http://localhost:3002/cart/add', {
    method: 'POST',
    credentials: 'include',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('token')}` 
     },
    body: JSON.stringify(product),
    
  });
  const data = await response.json();
  if(response.ok){
    alert('Product added to cart!');
    window.location.reload();
  } else if (data.message && data.message.includes("Out of stock")){
    alert("Out of stock"); 
  } else {
    alert('Failed to add product to cart:  ' + (data.message || 'Unknown erro'))
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}