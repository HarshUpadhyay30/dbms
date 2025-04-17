document.addEventListener('DOMContentLoaded', () => {
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const demoLoginBtn = document.getElementById('demoLoginBtn');

    // Tab switching functionality
    signInTab.addEventListener('click', () => {
        showTab('signin');
    });

    signUpTab.addEventListener('click', () => {
        showTab('signup');
    });

    // Sign In form submission
    signInForm.addEventListener('submit', handleSignIn);

    // Sign Up form submission
    signUpForm.addEventListener('submit', handleSignUp);

    // Demo Login functionality
    demoLoginBtn.addEventListener('click', handleDemoLogin);
});

// Function to handle tab switching
function showTab(tabName) {
    const signinForm = document.getElementById('signin');
    const signupForm = document.getElementById('signup');
    const signinTab = document.querySelector('.auth-tab:nth-child(1)');
    const signupTab = document.querySelector('.auth-tab:nth-child(2)');

    if (tabName === 'signin') {
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
        signupTab.classList.add('active');
        signinTab.classList.remove('active');
    }
}

// Handle Sign In
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Here you would typically make an API call to verify credentials
    console.log('Sign In:', { email, password });
    
    // For demo purposes, just redirect to main page
    window.location.href = 'index.html';
    return false;
}

// Handle Sign Up
function handleSignUp(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const phone = document.getElementById('signup-phone').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Here you would typically make an API call to create a new user
    console.log('Sign Up:', { name, phone, email, password });
    
    // For demo purposes, just redirect to main page
    window.location.href = 'index.html';
    return false;
}

// Handle Demo Login
function handleDemoLogin() {
    const demoEmail = 'demo@example.com';
    const demoPassword = 'demo123';

    // Here you would typically make an API call to verify credentials
    console.log('Demo Login:', { email: demoEmail, password: demoPassword });
    
    // For demo purposes, just redirect to main page
    window.location.href = 'index.html';
} 