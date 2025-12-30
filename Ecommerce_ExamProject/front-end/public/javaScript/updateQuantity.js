async function updateQuantity(itemId) {
  const newQuantity = document.getElementById("quantity-" + itemId).value;
  try {
    const response = await fetch(`/api/cart/${itemId}/quantity`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to update quantity.");
    }
  } catch (err) {
    console.log("Error updating quantity");
  }
}
