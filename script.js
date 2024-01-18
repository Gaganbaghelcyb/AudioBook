let currentUser;



document?.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    fetch(`http://localhost:3000/user?email=${email}`)
      .then((response) => response.json())
      .then((data) => {

        let user = data[0];

        showerror = document.getElementsByClassName("loginerror")[0];

        if (!user) {
          showerror.innerText = "please signup the users";
        } else if (password != user?.password) {
          showerror.innerText = "password dont match";
        } else {
          currentUser = user;
          try {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(currentUser),
            };
            
            fetch("http://localhost:3000/currentUser", requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log('Post request successful:', data);
              })
              .catch(error => {
                console.error('Error making POST request:', error);
              });
            
          } catch (error) {
            
          }
          finally{
            window.location.href = 'index.html';
          }


          
        }

        setTimeout(() => {
          showerror.innerText = "";
        }, 2000);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
});


function logout(){

  console.log("logout called")
  console.log(currentUser)
  const apiUrl = `http://localhost:3000/currentUser/${currentUser.id}`;

// Configuration for the fetch request
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // You might need additional headers depending on your server configuration
    },
  };

// Make the fetch request
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      console.log('User deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });

}


document?.getElementById("signupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const fullname = document.getElementById("signupFullName").value;
    const username = document.getElementById("signupUserName").value;
    const password = document.getElementById("signupPassword").value;
    fetch(`http://localhost:3000/user?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        let user = data[0];
        showerror = document.getElementsByClassName("signuperror")[0];
        if (user) {
          showerror.innerText = "User already exists";
        } else {
          let user ={
            "name":fullname,
            "userName":username,
            "email":email,
            "profileImage":"./mediaList/userProfileImages/user.png",
            "password":password,
            "favourites":[]
          }

          fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
          }).then((data)=>{

            currentUser = user;
            try {
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUser),
              };
              
              fetch("http://localhost:3000/currentUser", requestOptions)
                .then(response => response.json())
                .then(data => {
                  console.log('Post request successful:', data);
                })
                .catch(error => {
                  console.error('Error making POST request:', error);
                });
              
            } catch (error) {
              
            }
            finally{
              window.location.href = 'index.html';
            }
            
            window.location.href = 'index.html';

          })
          .catch(error => {
            console.error('Error:', error);
          });
        
        }

        setTimeout(() => {
          showerror.innerText = "";
        }, 2000);

      })
      .catch((error) => {
        console.error("Error:", error);
      });

     
});








isUser()
function isUser(){

  fetch(`http://localhost:3000/currentUser`).then(response=>response.json()).then((currentUserArray)=>{
    currentUser = currentUserArray[0];
    let navButton = document.getElementById( "profileBar" );
    let mobilenav = document.getElementById("mobilenavdyn");
    let navLogin = document.getElementById("navlogin");
      if(!currentUser){

        navButton.innerHTML=
        `
        <a href="/login.html"><button type="button" >LogIn</button></a>
        <a href="/signup.html"><button type="button" >Signup</button></a>
        `;
        console.log("LOGIN BUTTON")
        mobilenav.innerHTML=`<li>
        <a href="#">Login</a>
      </li>
      <li>
        <a href="#">Signup</a>
      </li>`
      }else{
        navButton.innerHTML=`
        <a href="./userProfile.html" class="flex flex-row ">
        <img class="imageRound" src=${currentUser.profileImage} />
        <li>${currentUser.userName}</li>
        </a>
        `

        mobilenav.innerHTML=
        `<li>
        <a href="#" onclick="logout()">Logout</a>
      </li>
        `
        navLogin.innerHTML=`<li>
                          <a onclick="favourits()" href="#">Favourits</a>
                        </li>
                        <li>
                        <a href="addBook.html" ><i class="fa fa-book" aria-hidden="true">+</i>
                        </a>
                        </li>
                        <li>
                          <a href="#" onclick="logout()">Logout</a>
                        </li>

                        
                        `
      }

  })

}






function favourits(){

  let ele = document.getElementById("searchs");
  document.getElementById("searchHeading").innerText = "Favourits";

  let innerh = currentUser?.favourites.map((book)=>(
    `<div onclick="setAudioPath('${book.audioPath}','${book.bookName}')" class="item">
      <img src="${book.bookImage}" />
      <div class="play">
        <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
      </div>
      <h4>${book.bookName}</h4>
      <div class="flex justifybet ">
      <p>${book.bookAuthor}</p>
      <p class="hoverOrange" onclick="removeFromFavourite('${book.id}')"><i class="fa fa-trash" aria-hidden="true"></i>
      </div>
     
      </p>
    </div>`
  ))
  ele.innerHTML = innerh;

}




async function fetchAllBooks(){

  return fetch("http://localhost:3000/books").then(response=>response.json()).then(data=>{
  
    return data.map((book)=>(
      `<div onclick="setAudioPath('${book.audioPath}','${book.bookName}')" class="item">
      <img src="${book.bookImage}" />
      <div class="play">
        <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
      </div>
      <h4>${book.bookName}</h4>
      <p>${book.bookDescription}</p>
      <div class="flex justifybet">
      <p>${book.bookAuthor}</p>
      <p class="hoverOrange" onclick=addToFavourite('${book.id}')><i class="fa fa-heart" aria-hidden="true"></i></p>
      </div>
    </div>`
    ))

  })

}


async function onScriptLoad(){


  let ele = document.getElementsByClassName("allbooks")[0];
  Motivation  =   `
  <div class="spotify-playlists">
  <h2>Motivation</h2>
  <div class="list">
  ${await generSearch("Motivation")}
  </div>
  </div>`;
  Horror  =  `
  <div class="spotify-playlists">
  <h2>Horror</h2>
  <div class="list ">
  ${await generSearch("Horror")}
  </div>
  </div>`
  Fantasy  = `
  <div class="spotify-playlists">
  <h2>Fantasy</h2>
  <div class="list">
  ${await generSearch("Fantasy")}
  </div>
  </div>`
  AllBooks= `
  <div class="spotify-playlists">
  <h2>ALL BOOKS</h2>
  <div class="list">
  ${await fetchAllBooks()}
  </div>
  </div>`
  ele.innerHTML = Motivation + Horror + Fantasy + AllBooks;

}
onScriptLoad()

function generSearch(gener){

   return fetch("http://localhost:3000/books").then(response=>response.json()).then(data=>{
    generArray =  data.filter((book)=>book.genre==gener)
  
    return generArray.map((book)=>(
      `<div onclick="setAudioPath('${book.audioPath}','${book.bookName}')" class="item ">
      <img src="${book.bookImage}" />
      <div class="play">
        <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
      </div>
      <h4>${book.bookName}</h4>
      <p>${book.bookDescription}</p>
      <div class="flex justifybet">
      <p>${book.bookAuthor}</p>
      <p class="hoverOrange" onclick=addToFavourite('${book.id}')><i class="fa fa-heart" aria-hidden="true"></i></p>
      </div>
    </div>`
    ))

  })

}


function setAudioPath(path,name){

  let atag = document.getElementById("audioPlayer")
  atag.src = path;
  atag.play();
  document.getElementById("playingAudioHeading").innerText = "Now Playing : " + name;

}



function languageSearch(language){

  fetch("http://localhost:3000/books").then(response=>response.json()).then(books=>{


    languageArray =  books.filter((book)=>book.languagetype==language)

  let results = languageArray.map((book)=>(
    `<div onclick="setAudioPath('${book.audioPath}','${book.bookName}')" class="item">
    <img src="${book.bookImage}" />
    <div class="play">
      <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
    </div>
    <h4>${book.bookName}</h4>
    <p>${book.bookDescription}</p>
    <div class="flex justifybet">
    <p>${book.bookAuthor}</p>
    <p class="hoverOrange" onclick=addToFavourite('${book.id}')><i class="fa fa-heart" aria-hidden="true"></i></p>
    </div>
  </div>`
  ))

  let ele = document.getElementById("searchs");
  document.getElementById("searchHeading").innerText= "language : "+ language;
  let innerh = results;
  ele.innerHTML = innerh;
  })
}


function search(searchValue){
  console.log("searchstarted")
  return fetch("http://localhost:3000/books").then(response=>response.json()).then(data=>{
     let booksArray =  data.filter((book)=>book.genre.replace(/\s/g, '').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase())
     || book.bookName.replace(/\s/g, '').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase())
     || book.id.replace(/\s/g, '').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase())
     || book.languagetype.replace(/\s/g, '').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase())
     || book.bookName.replace(/\s/g, '').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase())
     )
     
    console.log(booksArray)

  })


}


async function addSearchele() {
  let ele = document.getElementById("searchs");
  let searchValue = document.getElementById("searchBar").value;
  document.getElementById("searchHeading").innerText= "Showing result for :"+ searchValue;
  let innerh = await search(searchValue);
  ele.innerHTML = innerh;
}



async function initialRender() {
  let ele = document.getElementById("searchs");
  document.getElementById("searchHeading").innerText= "TOP BOOKS :";
  let innerh = await fetch("http://localhost:3000/books").then(response=>response.json()).then(data=>data.reverse()
  )
  innerh.length=5;
  ele.innerHTML = innerh.map((book)=>(
    `<div onclick="setAudioPath('${book.audioPath}','${book.bookName}')" class="item">
      <img src="${book.bookImage}" />
      <div class="play">
        <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
      </div>
      <h4>${book.bookName}</h4>
      <p>${book.bookDescription}</p>
      <div class="flex justifybet">
      <p>${book.bookAuthor}</p>
      <p class="hoverOrange" onclick=addToFavourite('${book.id}') ><i class="fa fa-heart" aria-hidden="true"></i></p>
      </div>
    </div>`
  ));
}


initialRender()




function showNav(){
    document.getElementsByClassName("mobilenavbar")[0].style.transform = "translateX(0)"
}



function hideNav(){
  document.getElementsByClassName("mobilenavbar")[0].style.transform = "translateX(-100%)"
}







function addToFavourite(bookId){
  fetch(`http://localhost:3000/books/${bookId}`).then(response=>response.json()).then(data=>{
    console.log(data)
    console.log(currentUser.favourites)
    if(!currentUser.favourites.find(item=>item.id===data.id)){
    currentUser.favourites.push(data);
    UpdateUser();
    alert("added to favourite")
  }
    
  })
}


function removeFromFavourite(bookId){


    if(currentUser.favourites.find(item=>item.id===bookId)){

      currentUser.favourites = currentUser.favourites.filter((item)=>item.id != bookId)
      UpdateUser();
      alert("book removed")

  }

}



function UpdateUser(){
  if(currentUser){

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    };

    fetch(`http://localhost:3000/currentUser/${currentUser.id}`,requestOptions).then(response=>response.json()).then(data=>{
      console.log(data)
    })
    fetch(`http://localhost:3000/user/${currentUser.id}`,requestOptions).then(response=>response.json()).then(data=>{
      console.log(data)
      
    })
  }
}






