document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        inputBook();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});


document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

const submitSearch = document.getElementById("searchBook")
submitSearch.addEventListener("submit", function (event) {
    event.preventDefault()
    searchBooks()
})

function checkFinish() {
    var checkBox = document.getElementById("inputBookIsComplete");
    var notComplete = document.getElementById("notComplete");
    var isComplete = document.getElementById("isComplete");
    if (checkBox.checked == true){
      isComplete.style.display = "inline";
      notComplete.style.display = "none";
    } else {
      notComplete.style.display = "inline";
      isComplete.style.display = "none";
    }
}

function inputBooks() {
    var inputdata = document.getElementById("inputBooks");
    if (inputdata.style.display === "block") {
        inputdata.style.display = "none";
    } else {
        inputdata.style.display = "block";
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
