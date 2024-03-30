let createForm = document.querySelector(".post-creation");
let title = document.querySelector('#title');
let bank = document.querySelector('#bank');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#text');
let imageFile = document.querySelector('#imagefile');

createForm.addEventListener('submit',function(e){
    e.preventDefault();
    let createText = text.value;
    let createDes;
    if(createText.indexOf('.') === -1) {
        createDes = createText;
    } else{
        createDes = createText.substring(0, createText.indexOf('.')+1)
    }
    //add ability to add pic from local, so use formdata
    let data = new FormData();
    data.append('title',title.value);
    data.append('bank',bank.value);
    data.append('imageURL',imageURL.value);
    data.append('text',createText);
    data.append('description',createDes);
    data.append('imageFile',imageFile.files[0]); 


    fetch('http://localhost:3000/posts',{
        method: 'POST',
        body: data
    }).then((response) => response.text()).then((data) => window.history.go()); //refresh page again right after post creation

})

//start -- use URL or upload image from local, if one is chosen, the other needs to be disabled
function disableInput(input1, input2) {
    if(input1.value) {
        input2.disabled = true;
    } else {
        input2.disabled = false;
    }
}

imageURL.addEventListener('change', () => disableInput(imageURL,imageFile));
imageFile.addEventListener('change', () => disableInput(imageFile,imageURL));
//end -- use URL or upload image from local, if one is chosen, the other needs to be disabled
