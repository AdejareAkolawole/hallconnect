document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.auth-form form');
    const submitBtn = loginForm.querySelector('.submit-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email.includes('@') || email.length < 5) {
            alert('Please enter a valid email.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        // Check credentials
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.hashedPassword === btoa(password));

        if (!user) {
            alert('Invalid email or password.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        // Set login state
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', email);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        window.location.href = 'dashboard.html';
    });

    // Social login (mock for now)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Social login not implemented yet.');
        });
    });
});