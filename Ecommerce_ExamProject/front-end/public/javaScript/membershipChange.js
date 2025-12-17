async function handleMembershipChange() {
  const selectedMembership = document.getElementById('selectedMembership').value;
  if (selectedMembership === 'Bronze') {
    try {
      const response = await fetch(`http://localhost:3002/orders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      const data = await response.json();
      const orders = data.data.result;
      
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

        for (const item of orders) {         
          const tr = document.createElement('tr');
          let adminButton = '';
          //----------------Initialized using Copilot (lines 23 - 30)-------------------//
          if (window.currentUser && window.currentUser.username === "Admin") {
            adminButton = `
              <select data-userId ="${item.userid}" class= "membership-select" >
                  <option${item.membershipName === 'Bronze' ? 'selected' : ''}>Bronze</option>
                  <option${item.membershipName === 'Silver' ? 'selected' : ''}>Silver</option>
                  <option${item.membershipName === 'Gold' ? 'selected' : ''}>Gold</option>
              </select>
              <button class="change-membership-btn" data-userId="${item.userid}">Change</button>
               `;
            } 
          
          tr.innerHTML = `
            <td>${item.orderNumber}</td>
            <td>${item.status}</td>
            <td><img src='${item.imgurl}' alt='${item.name}' style="max-width:80px;max-height:80px;"/></td>
            <td>${item.name}</td>
            <td>
                ${adminButton} 
            </td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.userId}</td>
          `;
          tbody.appendChild(tr);
        };
       //----------------Initialized using Copilot (lines 49 - 71)-------------------//
        tbody.querySelectorAll('.change-membership-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const userId = btn.getAttribute('data-userid');
          const select = tbody.querySelector(`select[data-userid="${userId}"]`);
          const membershipName = select.value;
          try {
            const response = await fetch(`http://localhost:3002/orders/${userId}/membership`, {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({ membershipName })
            });
            if (response.ok) {
              alert('Membership updated!');
              handleMembershipChange(); // Refresh table
            } else {
              alert('Failed to update membership');
            }
          } catch (err) {
            alert('Error updating membership');
          }
        });
      });

    } catch (err){
      console.log (err);
    }    
  }
};