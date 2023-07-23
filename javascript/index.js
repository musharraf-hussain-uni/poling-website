// Signup page elements
const signupNameInput = document.getElementById('signup-name');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const signupError = document.getElementById('signup-error');

// Login page elements
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');


// Your JavaScript code here
// Add input event listener to restrict characters in name field
signupNameInput.addEventListener('input', () => {
    signupNameInput.value = signupNameInput.value.replace(/[^a-zA-Z ]/g, '');
});

// Signup event listener
signupBtn.addEventListener('click', () => {
    const name = signupNameInput.value;
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    // Validate input
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        signupError.textContent = 'Please fill in all fields.';
        return;
    }

    // Validate email
    if (!isValidEmail(email)) {
        signupError.textContent = 'Please enter a valid email address.';
        return;
    }

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update display name
            const user = userCredential.user;
            user.updateProfile({
                displayName: name
            });

            // Redirect to login page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            signupError.textContent = error.message;
        });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}