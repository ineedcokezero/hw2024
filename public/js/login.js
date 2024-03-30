let signInForm = document.querySelector('.signin-form');
let regiForm = document.querySelector('.regi-form');

signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.querySelector('#signin-email').value;
    let password = document.querySelector('#signin-password').value;
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((resp) => resp.json()).then((data) => {
        let redirectURL = data.redirectURL;
        if(redirectURL) {
            window.location.href = redirectURL;
        } else {
            alert('please try again')
        }
    });
})

regiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.querySelector('#regi-email').value;
    let password = document.querySelector('#regi-password').value;
    let repassword = document.querySelector('#regire-password').value;

    if(password !== repassword) {
        return;
    }
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((resp) => resp.text()).then((data) => alert(data));
})