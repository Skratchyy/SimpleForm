var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var subBtn = document.getElementById("submitForm");
var address = document.getElementById("address");
var birthDate = document.getElementById("birthDate");
var gender = document.getElementById("gender");
var notes = document.getElementById("notes");
var table = document.getElementById("data");
var clearBtn = document.getElementById("clear");
var popup = document.getElementById("popup");
var note = document.getElementById("notes-pg")
var specialChars = new RegExp(/[^A-Za-z]+/g);
var arr = new Array();
var id;
var modalTitle = document.getElementById("modalTitle")

function chars(){
    if(specialChars.test(this.value)){
        document.getElementById(this.id + "Alert").style.display = "block";
        this.style.border = "2px solid red";
    }else {
        document.getElementById(this.id + "Alert").style.display = "none";
        this.style.border = "";
    }
}
function submitForm () {
    if(specialChars.test(firstName.value) || specialChars.test(lastName.value)){
        window.scrollTo(0,0);
    }else if(firstName.value == ""){
        window.scrollTo(0,0);
        firstName.style.border = "2px solid red";
    }else if(lastName.value == ""){
        window.scrollTo(0,0);
        lastName.style.border = "2px solid red";
    }else {
        addData();
    }
}
function deleteData () {
    localStorage.clear();
    location.reload();
}
function getData() {
    var str = localStorage.getItem(id)
    if(str != null){
        arr = JSON.parse(str); 
    }
}
function addData () {
    id = localStorage.length;
    getData(id);
    
    arr.push({
        id: id,
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        gender: gender.value,
        date: birthDate.value,
        notes: notes.value
    });
    
    window.localStorage.setItem(id, JSON.stringify(arr));
    window.location.reload();
}
function showData() {
    

    if(localStorage.length != 0){
        for(let i = 0;i < localStorage.length;i++){
            var key = localStorage.key(i)
            var b = JSON.parse(localStorage.getItem(key))
            var a = b[0]
            function getId(){
                console.log(cell7);
            }

            var row = table.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell();
            var cell5 = row.insertCell();
            var cell6 = row.insertCell();
            var cell7 = row.insertCell();

            cell1.innerHTML = a.id;
            cell1.style.cssText += "font-weight: bold"
            cell2.innerHTML = a.firstName;
            cell3.innerHTML = a.lastName;
            cell4.innerHTML = a.address;
            cell5.innerHTML = a.date;
            cell6.innerHTML = a.gender;
            cell7.innerHTML = `<button type="button" class="btn btn-sm btn-outline-danger" id="${a.id}" onclick="{localStorage.removeItem(this.id); location.reload()}" class="delBtn">Delete</button>`;
            row.style.cssText = "cursor: pointer";
            row.setAttribute("id",a.id)
            row.setAttribute("data-bs-toggle", "modal")
            row.setAttribute("data-bs-target", "#myModal")
            row.onclick = function openPopup(){
                var toGo = localStorage.getItem(this.id);
                var toDo = JSON.parse(toGo)
                var toWr = toDo[0];
                note.innerHTML = toWr.notes
            } 
        }    
    }
}

showData()
firstName.onblur = chars;
lastName.onblur = chars;
subBtn.onclick = submitForm;
clearBtn.onclick = deleteData;
