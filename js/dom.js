const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList"
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"
const BOOK_ITEMID = "itemId"

function insertBooks(title, author, year, isCompleted) {
    const inputBookTitle = document.createElement("h3")
    inputBookTitle.innerText = title

    const inputBookAuthor = document.createElement('p')
    inputBookAuthor.innerHTML = "Author(s) : " + author

    const inputBookYear = document.createElement('p')
    inputBookYear.innerHTML = "Publicate Date : " + year

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("action")
    
    const article = document.createElement("article")
    article.classList.add("book_item")
    article.append(inputBookTitle, inputBookAuthor, inputBookYear)
    if (isCompleted) {
        buttonContainer.append(
            createUndoButton(),
            createEraseButton()
        );
        article.append(buttonContainer)
    } else {
        buttonContainer.append(
            createFinishButton(),
            createEraseButton()
        );
        article.append(buttonContainer)
    }
    return article

}

function createButton(buttonTypeClass, eventListener, text) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function createFinishButton() {
    return createButton("finish-button", function (event) {
        inputBookToComplete(event.target.parentElement.parentElement)
    }, "Finished Reading")
}
function createEraseButton() {
    return createButton("erase-button", function (event) {
        document.getElementById('idModal').style.display = 'block'
        removeBookFromCompleted(event.target.parentElement.parentElement)
    }, "Delete Book")
}

function createUndoButton() {
    return createButton("unfinished-button", function (event) {
        undoBookfromCompleted(event.target.parentElement.parentElement)
    }, "To Be Read")
}

function inputBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID)
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;
    const book = insertBooks(inputBookTitle, inputBookAuthor, inputBookYear, isCompleted);
    const bookObject = composeBookObject(inputBookTitle, inputBookAuthor, inputBookYear, isCompleted);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    if (isCompleted) {
        completedBookList.append(book);
        alert("Successfully insert the book " + inputBookTitle);
    } else {
        uncompletedBookList.append(book);
        alert("Successfully insert the book " + inputBookTitle);
    }
    updateDataToStorage();
}


function inputBookToComplete(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID)
    const inputBookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const inputBookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText.replace('Author(s) : ', '');
    const inputBookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText.replace('Publicate Date : ', '');


    const inputBook = insertBooks(inputBookTitle, inputBookAuthor, inputBookYear, true)
    const book = findBook(taskElement[BOOK_ITEMID])
    book.isCompleted = true
    inputBook[BOOK_ITEMID] = book.id

    listCompleted.insertBefore(inputBook, listCompleted.firstElementChild)
    taskElement.remove()
    updateDataToStorage()
}


function removeBookFromCompleted(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    document.getElementById('deleteBtn').addEventListener("click", function () {
        books.splice(bookPosition, 1);
        taskElement.remove();
        updateDataToStorage();
    })

}

function undoBookfromCompleted(taskElement) {
    const inputBookTitle = taskElement.querySelector(".book_item > h3").innerText
    const inputBookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText.replace('Author(s) : ', '')
    const inputBookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText.replace('Publicate Date : ', '')

    const inputBook = insertBooks(inputBookTitle, inputBookAuthor, inputBookYear, false)

    const unlistCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID)
    const book = findBook(taskElement[BOOK_ITEMID])
    book.isCompleted = false
    inputBook[BOOK_ITEMID] = book.id

    unlistCompleted.appendChild(inputBook)
    taskElement.remove()
    updateDataToStorage()
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);


    for (book of books) {
        const newBook = insertBooks(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;


        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}


function searchBooks() {
    const textSearch = document.getElementById("searchBookTitle").value

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID)
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID)

    let takes = books.filter((book)  => {
        return book.title.toLowerCase().includes(textSearch.toLowerCase())
    })
    const isCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID).childElementCount
    const uncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID).childElementCount
    
    let i = 0
    while (i < isCompleted) {
        listCompleted.removeChild(listCompleted.lastElementChild)
        i++
    }
    i = 0;
    while (i < uncompleted) {
        listUncompleted.removeChild(listUncompleted.lastElementChild)
        i++
    }
    for (book of takes) {
        const inputBook = insertBooks(book.title, book.author, book.year, book.isCompleted);
        inputBook[BOOK_ITEMID] = book.id;
        if (book.isCompleted) {
            listCompleted.append(inputBook);
            console.log("completed : ", inputBook)
        }
        if (book.isCompleted == false) {
            listUncompleted.append(inputBook);
            console.log("uncompleted : ", inputBook);
        }
    }
}



