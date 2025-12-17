function deleteOrder(productId) {
  fetch(`http://localhost:3002/orders/${productId}`, {
    method: "DELETE",
    credentials: 'include',
    headers: { 
        'Authorization': `Bearer ${getCookie('token')}` 
    },
  })
    .then(res =>{
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete user");
      }
    });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}