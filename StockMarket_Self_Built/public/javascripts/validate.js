function validateSignup () {
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('current-password').value.trim();
    
    const namePattern = /^[A-Za-zæøåÆØÅ\- ]{2,30}$/;
    const usernamePattern = /^[A-Za-z0-9_]{2,30}$/;
 
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

    if(!namePattern.test(fullName)) {
        alert ("Full Name: Only letters, spaces and hyphens; 2-30 characters.");
        return false;
    }
    if(!usernamePattern.test(username)) {
        alert("Username: 3-20 letters, numbers and/or underscores.");
        return false;
    }

    if(!passwordPattern.test(password)) {
        alert("Password: At least 8 characters, including a letter and a number");
        return false;
    }
    return true;
}