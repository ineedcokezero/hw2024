async function getPosts() {
    return await fetch('http://localhost:3000/posts')
        .then((response) => response.json())
        .then((data) => data);
}

async function getEmails() {
    return await fetch('http://localhost:3000/emails')
        .then((response) => response.json())
        .then((data) => data);
}

document.addEventListener('DOMContentLoaded', async function () {
    addPosts();
    addEmails();
    
    // new post button hide
    let addPostBtn = document.querySelector('.add-post');
    let addPostBtnhd = document.querySelector('#v-pills-add-post-hd-tab');
    addPostBtn.addEventListener('click', () => addPostBtnhd.click());
})

async function addPosts(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles-list tbody');
    articles.innerHTML = '';
    let i  = 1;// show order number for each post
    posts.forEach((post) => {
        let postHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="bank">${post.bank}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">Remove</button></td>
        </tr>
        `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

async function addEmails(){
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails tbody');
    emailsBlock.innerHTML = '';
    let i  = 1;
    emails.forEach((email) => {
        let emailHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${email.id}"></td>
            <td class="name">${email.name}</td>
            <td class="email">${email.email}</td>
            <td class="date">${email.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        <tr>
            <td colspan="5" class="text">${email.text}</td>
        </tr>
        `;
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML)
    })

}

let emailsBlock = document.querySelector('#v-pills-mails');

emailsBlock.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/emails/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => window.history.go());
    }
})

let logOutBtn = document.querySelector('.log-out-btn');

logOutBtn.addEventListener('click', function() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})