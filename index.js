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
