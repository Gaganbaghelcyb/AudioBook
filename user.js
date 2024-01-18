let currentUser;

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


  function fetchUser(){
    fetch(`http://localhost:3000/currentUser`).then(response=>response.json()).then(data=>{
        currentUser = data[0]
         document.getElementById("fullname").innerText = data[0].name;
         document.getElementById("userName").innerText = data[0].userName;
         document.getElementById("password").innerText = data[0].password;
         document.getElementById("email").innerText = data[0].email;       
      })
  }

  fetchUser()


  
function changePassword(newPassword) {
    let oldPassword = prompt("Enter your old password");
    console.log(oldPassword,currentUser.password)
      if(oldPassword === currentUser.password){
        let newPassword = prompt("Enter new password")
        currentUser.password = newPassword;
        UpdateUser()
        console.log(currentUser)
      }else{
        alert("wrong old password")
        console.error("Old password is not correct");
      }
    }


function changeEmail(){
  let email = prompt("enter email")

  if(/\S+@\S+\.\S+/.test(email)){
    currentUser.email = email;
    UpdateUser()

  }else{
    alert("Enter proper email")
  }
  
}


function changeName(){
  let newName = prompt("Enter name");
  currentUser.name = newName;
  UpdateUser()
}


function changeUserName(){
  let userName = prompt("Enter UserName");
  currentUser.userName = userName;
  UpdateUser()
}