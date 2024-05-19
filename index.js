function display() {
  let get = document.getElementById("open-menu");
  if (get.style.display === "flex") {
    get.style.display = "none";
  } else {
    get.style.display = "flex";
  }

  document.getElementById("open-menu").style.flexDirection = "column";
  document.getElementById("menuid").style.flexDirection = "column";
  document.getElementById("navbar").style.flexDirection = "column";
  get.style.flexDirection = "column";
  get.style.marginLeft = "30px";
}

function signup() 
{
    let firstname = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let mail = document.getElementById("email").value;
    let pwd = document.getElementById("password").value;
  
    let userdata = {
      firstname: firstname,
      lastname: lastname,
      email: mail,
      password: pwd,
    };

    if (firstname == "") {
      alert("Enter first name")
  }
  else if (lastname == "") {
      alert("Enter last name")
  }
  else if (mail == "") {
      alert("Enter email")
  }
  else if (pwd == "") {
      alert("Enter password")
  }
  else {
  
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", mail);
    localStorage.setItem("password", pwd);
    alert("REGISTRATION SUCCESSFULL!");
    window.location.href = "./login.html";
  }
}

function login()
{
    let m = document.getElementById("mail").value;
    let p = document.getElementById("pwd").value;

      if((m==localStorage.getItem("email")) && (p==localStorage.getItem("password")))
        {
          alert("Login successful");
        }
        else if((m!=localStorage.getItem("email")) && (p==localStorage.getItem("password")))
        {
          alert("incorrect email")
        }
        else if((m==localStorage.getItem("email")) && (p!=localStorage.getItem("password"))){
          alert("incorrect password")
        }
      else
      {
          alert("User not found.Enter details");
      }
}

function show(){
    const pass = document.getElementById('pwd');
    if (pass.type === 'password') {
        pass.type = 'text';
    } 
    else {
        pass.type = 'password';
   }
  }



function forgot(){
  let email=prompt("enter email");
  if (email !== localStorage.getItem("email")) 
    {
    alert("Email not found!");
    } 
  else 
  {
    alert("Your password is: " + localStorage.getItem("password"));
  }

}
