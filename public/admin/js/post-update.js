{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-hd-tab');
    let updateForm = document.querySelector('.post-update');
    let id; 

    let titleInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');

    articlesBlock.addEventListener('click', async function (e) {
        if (e.target.classList.contains('edit-btn')) {
            //get original id
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + id)
                .then((response) => response.json())
                .then((data) => data)
            titleInput.value = postInfo.title;
            textArea.value = postInfo.text;
            updateBtn.click();
        }
    })

    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let updateDes;
        if(textArea.value.indexOf('.') === -1) {
            updateDes = textArea.value;
        } else{
            updateDes = textArea.value.substring(0, textArea.value.indexOf('.')+1)
        }
        fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                text: textArea.value,
                description: updateDes
            })
        }).then((resp) => resp.text()).then(() => window.history.go());
    })
}