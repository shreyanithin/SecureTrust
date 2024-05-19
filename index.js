const user = [];
const currentUser = {
  balance: 0,
  transactions: [],
};

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
  
    let user = {
      firstname: firstname,
      lastname: lastname,
      email: mail,
      password: pwd,
    };
    // user.push({ mail, pwd, balance: 0, transactions: [] });

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
  // currentUser = user;
    let m = document.getElementById("mail").value;
    let p = document.getElementById("pwd").value;
   let firname=localStorage.getItem("firstname");

      if((m==localStorage.getItem("email")) && (p==localStorage.getItem("password")))
        {
          alert("Login successful");
          window.location.href = "./myaccount.html";
          console.log(firname);
        const accountName = document.getElementById('username-display');
        accountName.innerHTML =
         `
              <h1>${localStorage.getItem("firstname")}</h1>
        `;
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


function logout(){
  let lo=prompt("Are you sure you want to exit?y/n")
  if(lo=='y' || lo=='Y'){
   window.location.href = "./home.html";
  }
}

let passwd=localStorage.getItem("password");
let mail=localStorage.getItem("email");

function viewDetails() {
  const accountDetails = document.getElementById('account-details');
  accountDetails.innerHTML = `
      <h4>Username: ${localStorage.getItem("email")}</h4>
      <h4>Account Balance: ${localStorage.getItem("Balance")}</h4>
  `;
}

function withdraw(){
  let p = document.getElementById("pass").value;
  if(p==passwd){
    const amt = parseFloat(document.getElementById('with-amt').value);
    if (amt>currentUser.balance || amt<0){
      alert('Invalid amount or insufficient balance.');
    }
    else
    {
      currentUser.balance-=amt;
      localStorage.setItem("Balance", currentUser.balance);
      viewDetails();
      alert("new balance is "+currentUser.balance);
      // transactions.push({ type: 'Withdraw', amount });
      document.getElementById('with-amt').value = '';
      document.getElementById("pass").value='';
    }
  }
  else
    alert("Password is incorrect");
}

function deposit(){
  let p = document.getElementById("deppwd").value;
  if(p==passwd){
    const amt = parseFloat(document.getElementById('dep-amt').value);
    currentUser.balance+=amt;
    localStorage.setItem("Balance", currentUser.balance);
    // currentUser.transactions.push({ type: 'Deposit', amount });
    viewDetails();
    document.getElementById('dep-amt').value = '';
    document.getElementById('deppwd').value = '';
  }
  else
    alert("Password is incorrect");
}

function transfer(){
  let p = document.getElementById("transpwd").value;
  if(p==passwd){

  }
  else
    alert("Password is incorrect");
}
