import React from 'react';
import "./login.css"

import { useNavigate } from 'react-router-dom';

function checkcreds(name, pass) {
  if (!name.value | !pass.value){
      const ErrorEL = document.createElement("h2");


      if (!name.value){
          ErrorEL.textContent = "You Need a UserName";
      }
      else{
          ErrorEL.textContent = "You Need a Password";
      }

      const headerEl= document.getElementById("loginBox");
      headerEl.parentNode.insertBefore(ErrorEL, headerEl.nextSibling);

      headerEl.style.textAlign = 'center';
      setTimeout(() => {
          ErrorEL.remove()
      }, 1000);

      return false;
      
  }
  else{return true};
}

async function createaccount(){
  const nameEL = document.querySelector("#name");
  const passEL = document.querySelector("#password");
  // console.log("here")


  // const navigate = useNavigate();

  if (checkcreds(nameEL,passEL)){

     let dct = {
          "email":nameEL.value,
          "password":passEL.value,
      }
  
      const response = await fetch('/api/auth/create', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(dct),
      });

      console.log(response);

      if (response.ok) {
          localStorage.setItem('username', nameEL.value);
          window.location.href = '/question';
          return true
          // navigate("/question")
      }
      return false

  }   

  }

async function userLogin(){
  const nameEL = document.querySelector("#name");
  const passEL = document.querySelector("#password");


  if (checkcreds(nameEL,passEL)){



      let dct = {
          "email":nameEL.value,
          "password":passEL.value,
      }


      const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(dct),
      });

      console.log(response);

      if (response.ok) {
          localStorage.setItem('username',nameEL.value);
          window.location.href = '/question';
          return true;
          
  }
      else{
        return false
    }


}
return false
}

export function Login() {
  const navigate = useNavigate();

  return (
      <main>
        <div className="login-border" id="loginBox">
            <div className="login">
                <h3>YOU HAVE QUESTIONS, WE HAVE ANSWERS</h3>
                <p>Login to Ask A Question</p>
                
                <label className="login-label">Username</label>
                <input type = "text" id="name" placeholder="Username" />
                <label className="login-label">Password</label>
                <input type="text" id="password" placeholder="Password" />
                <button className="login-button" type="submit" onClick={() => {
                    userLogin();
                  }} >Login</button>
                <button className="login-button" type="submit" onClick={() => {
                  createaccount();
                  }}>Create Account</button>
            
            </div>
        </div>
    </main>
  );
}