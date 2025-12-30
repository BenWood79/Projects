async function CheckOutNow() {
  const response = await fetch("/api/cart/checkOut", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  const data = await response.json();
  if (response.ok && data.success) {
    alert("Order Placed");
    window.location.reload();
  } else {
    alert("Checkout failed:  " + (data.message || "Unknown erro"));
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
