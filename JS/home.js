var nameInput= document.getElementById("name");
var urlInput= document.getElementById("url");
var abbBtn= document.getElementById("addBtn");


var tableBody= document.getElementById("tableBody");

var bookMarks;
var mainIndex=0;

if(localStorage.getItem("bookmark")==null){
    bookMarks=[];
}else{
    bookMarks= JSON.parse(localStorage.getItem("bookmark"));
    displayBook(bookMarks);
}

var nameRegex= /^[A-Za-z_]$/;
function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }else{
        return false;
    }
}

var urlRegex= /^(http:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;
function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }else{
        return false;
    }
}

nameInput.onkeyup= function(){
    if(isNameValid() && isUrlValid()==true){
        abbBtn.disabled= "true";
    }else{
        abbBtn.removeAttribute(" disabled");
    }
}

urlInput.onkeyup= function(){
    if(isNameValid() && isUrlValid()==true){
                abbBtn.disabled= "true";
    }else{
            abbBtn.removeAttribute(" disabled");
    }
}

abbBtn.onclick= function(){
    if(abbBtn.innerHTML="Update"){
        abbBtn.innerHTML="Submit";
        var bookMark= {
            name: nameInput.value,
            url: urlInput.value
        }
        bookMarks.splice(mainIndex,1,bookMark);
    }else{
        var bookMark= {
            name: nameInput.value,
            url: urlInput.value
        }
        bookMarks.push(bookMark);
    }
 
    localStorage.setItem("bookmark", JSON.stringify(bookMarks));
    displayBook(bookMarks);
    clearData();
}


function displayBook(anyArray){
    var marks= ``;
    for(var i=0; i<bookMarks.length; i++){
        marks+=`
        <tr>
        <td>${bookMarks[i].name}</td>
        <td><button class="btn btn-primary">Visit</button></td>
        <td><button class="btn btn-info" onclick="updateBook(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML= marks;
}


function deleteBook(index){
   bookMarks.splice(index,1);
   localStorage.setItem("bookmark", JSON.stringify(bookMarks));
   displayBook(bookMarks);
}

function clearData(){
    nameInput.value="";
    urlInput.value="";
}

function updateBook(index){
    nameInput.value= bookMarks[index].name;
    urlInput.value= bookMarks[index].url;
    abbBtn.innerHTML= "Update";
    mainIndex= index;
}

function search(term){
    var wantedBook=[];
    for(var i=0; i<bookMarks.length; i++){
        if(bookMarks[i].name.toLowerCase().includes(term)){
            wantedBook.push(bookMarks[i]);
        }
    }
    deleteBook(wantedBook);
}