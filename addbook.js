



function addbook(){
    

    let bookName = document.getElementById("bookName").value;
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookId = document.getElementById("bookId").value;
    let bookDescription = document.getElementById("bookDesc").value;
    let genre = document.getElementById("bookGenre").value;
    let languagetype = document.getElementById("languagetype").value;


    let book = {
        bookName,
        bookAuthor,
        bookDescription,
        bookId,
        genre,
        languagetype,
        "isPlaying": false,
        ratings:[],
        audioPath:"./mediaList/audiobooks/Becoming.mp3",
        bookImage:"./mediaList/audiobookImages/newSong.png" 
    }

    const requestObject ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      };




    fetch("http://localhost:3000/books",requestObject).then(response=>response.json()).then(data=>{
        console.log(data)
        alert("Book added successfully")
    })
    
}