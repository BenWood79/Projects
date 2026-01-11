function validateSignup () {

    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const password = document.getElementById('current-password').value.trim();
    
    const namePattern = /^[A-Za-zæøåÆØÅ\- ]{2,30}$/;
    const usernamePattern = /^[A-Za-z0-9_]{2,30}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-\s]{8,20}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

    if(!namePattern.test(firstname)) {
        alert ("First Name: Only letters, spaces and hyphens; 2-30 characters.");
        return false;
    }
    if(!namePattern.test(lastname)) {
        alert("Last Name: Only letters, spaces and hyphens; 2-30 characters.");
        return false;
    }
    if(!usernamePattern.test(username)) {
        alert("Username: 3-20 letters, numbers and/or underscores.");
        return false;
    }
    if(!emailPattern.test(email)) {
        alert("Email: Please enter a valid email address");
        return false;
    }
    if(address.length < 5 || address.length > 100) {
        alert("Address: 5-100 characters");
        return false;
    }
    if(!phonePattern.test(telephone)) {
        alert("Telephone: 8-20 digits, spaces, + or - allowed");
        return false;
    }
    if(!passwordPattern.test(password)) {
        alert("Password: At least 8 characters, including a letter and a number");
        return false;
    }
    return true;
}