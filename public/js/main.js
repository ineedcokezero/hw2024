async function getPosts() {
    return await fetch('http://localhost:3000/posts')
        .then((response) => response.json())
        .then((data) => data);
}

//Home Page post display
document.addEventListener('DOMContentLoaded', async function () {
    let posts = await getPosts();
    let articles = document.querySelector('.homeclass');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
            <div class="col">
                <div class="card">
                    <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <a href="/dd?id=${post.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
        `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })


})

let emailRequestForm = document.querySelector('.email-request');

emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/emails/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:  document.querySelector('#name').value,
            email:  document.querySelector('#email').value,
            text:  document.querySelector('#message').value
        })
    }).then((resp) => resp.text()).then(() => window.history.go());

})