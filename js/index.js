const users =JSON.parse(localStorage.getItem("users")) ||  []; 
let currentUser =JSON.parse(localStorage.getItem("currentUser")) || {
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

function faqshow() {
  let elements = document.getElementsByClassName("faq-content");
  let cont=document.getElementsByClassName("faq-box");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].style.display === "flex") {
      elements[i].style.display = "none";
      cont[i].style.height="110px";
    } else {
      elements[i].style.display = "flex";
      cont[i].style.height="300px";
    }
  }

}


function signup() 
{
    let firstname = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let mail = document.getElementById("email").value;
    let pwd = document.getElementById("password").value;
  
    const user=users.find(user=> user.email==mail );
  if(user){
    alert("user is already created");
    document.getElementById("fname").value='';
    document.getElementById("lname").value='';
    document.getElementById("email").value='';
    document.getElementById("password").value='';
  }
  else{
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
  }else {

    let user = {
      firstname: firstname,
      lastname: lastname,
      email: mail,
      password: pwd,
      balance: 0,
      transactions: []
    };
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users))
    alert("REGISTRATION SUCCESSFULL!");
    window.location.href = "./login.html";
  }
}
}

function login()
{
    let m = JSON.parse(localStorage.getItem("users"))
    let p = document.getElementById("pwd").value;
    
  const user=users.find(user=> user.email==m && user.password==p);
  if(user){
     let currentUser = user;
     localStorage.setItem("currentUser", JSON.stringify(currentUser));
      currentUser.balance=user.balance;
      currentUser.transactions=user.transactions;
      window.location.href = "./myaccount.html";
    }
   
    else {
      if (mail === "") {
          document.getElementById("emptymail").style.display = "flex";
          document.getElementById("emptypwd").style.display = "none";
      } else if (p === "") {
          document.getElementById("emptymail").style.display = "none";
          document.getElementById("emptypwd").style.display = "flex";
      } else {
          alert("Incorrect email or password");
      }
  }
}

window.onload = function() {
  let balance = parseFloat(localStorage.getItem("Balance"));
  let currentUser = {
      balance: isNaN(balance) ? 0 : balance
  };
    const storedUserString = localStorage.getItem("currentUser"); 
    if (storedUserString) {
        currentUser = JSON.parse(storedUserString);}
        const accountName = document.getElementById('username-display');
        accountName.innerHTML = `<h3 style="color: #CAFF33;">Welcome <span style="color: white;">${currentUser.firstname}</span></h3>`;      
  const transactions=JSON.parse(localStorage.getItem("Transactions"));
  currentUser.transactions=transactions || [];
};

function show(){
    const pass = document.getElementById('pwd');    
   pass.type = pass.type === 'password' ? 'text' : 'password';
  }

function forgot(){
  let email = prompt("Enter email");
  const user = users.find(user => user.email === email);
  if (user) {
    alert("Your password is: " + user.password);
  } else {
    alert("Email not found!");
  }

}

function logout(){
  let lo = prompt("Are you sure you want to exit? (y/n)");
  if (lo.toLowerCase() === 'y') {
    window.location.href = "./home.html";
  }
}


function viewDetails() {
  const storedUserString = localStorage.getItem("currentUser"); 
    if (storedUserString) {
        currentUser = JSON.parse(storedUserString);}
      const accountDetails = document.getElementById('account-details');
if(accountDetails){
  accountDetails.innerHTML = `
      <h4>Username: ${currentUser.email}</h4>
      <h4>Account Balance: ${currentUser.balance}</h4>
  `;
}}

function withdraw() {
  let p = document.getElementById("pass").value;
  let amtValue = document.getElementById('with-amt').value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  if (amtValue === '') {
    alert('Enter the amount');
  }else if (p === '') {
    alert('Enter the password');
  }
   else {
    if (p === currentUser.password) {
      const amt = parseFloat(amtValue);
      if (isNaN(amt) || amt > currentUser.balance || amt <= 0) 
      { 
        alert('Invalid amount or insufficient balance.');
      }
       else {
        currentUser.balance -= amt;
         const transaction = {
          date: new Date(),
          type: 'Withdraw',
          amount: amt
        };
        currentUser.transactions.push(transaction);
        users = users.map(user => {
          if (user.email === currentUser.email) {
            user.balance = currentUser.balance;
            user.transactions=currentUser.transactions;
          }
          return user;
        });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("users", JSON.stringify(users));
        viewDetails();
        alert("New balance is " + currentUser.balance);
        document.getElementById('with-amt').value = '';
        document.getElementById('pass').value = '';
      }
    } else {
      alert("Password is incorrect");
    }
  }
}


function deposit(){
  let p = document.getElementById("deppwd").value;
  let amtValue = document.getElementById('dep-amt').value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  if (amtValue === '') {
    alert('Enter the amount');
  }else if (p === '') {
    alert('Enter the password');
  }
   else {
    if (p === currentUser.password) {
      const amt = parseFloat(amtValue);
      if (isNaN(amt) || amt <= 0) { 
        alert('Invalid deposit amount.');
      } 
      else {
        currentUser.balance += amt;
        const transaction = {
          date: new Date(),
          type: 'Deposit',
          amount: amt
        };
       currentUser.transactions.push(transaction);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        users = users.map(user => {
          if (user.email === currentUser.email) {
            user.balance = currentUser.balance;
            user.transactions=currentUser.transactions;
          }
          return user;
        });
       
        localStorage.setItem("users", JSON.stringify(users));
        viewDetails();
        alert("New balance is " + currentUser.balance);
        document.getElementById('dep-amt').value = '';
        document.getElementById('deppwd').value = '';
      }
    } else {
      alert("Password is incorrect");
    }
  }
}


function transfer() {
  let p = document.getElementById("transpwd").value;
  let emailValue = document.getElementById('transmail').value;
  let amtValue = document.getElementById('transamt').value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

if (emailValue === '') {
  alert('Enter the mail');
} else if (amtValue === '') {
  alert('Enter the amount');
}else if (p === '') {
  alert('Enter the password');
} else {
  if (p === currentUser.password) {
    const amt = parseFloat(amtValue);
    if (isNaN(amt) || amt <= 0) {
      alert('Invalid transfer amount.');
    } else if (amt > currentUser.balance) {
      alert('Insufficient balance for transfer');
    } else {
      
      const recipientUser = users.find(user => user.email === emailValue);
      if (!recipientUser) {
        alert('Recipient not found');
        return;
      }
      currentUser.balance -= amt;
      const transaction = {
        date: new Date(),
        type: 'Transfer',
        amount: amt,
        recipient: emailValue
      };

      currentUser.transactions.push(transaction);
      users = users.map(user => {
        if (user.email === currentUser.email) {
          user.balance = currentUser.balance;
          user.transactions=currentUser.transactions;
        }
        return user;
      });
      recipientUser.transactions.push({
        ...transaction,
        type: 'Deposit' 
      });
      recipientUser.balance+=amt;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("users", JSON.stringify(users));
      viewDetails();
      alert("New balance is " + currentUser.balance);
      document.getElementById('transmail').value = '';
      document.getElementById('transamt').value = '';
      document.getElementById("transpwd").value = ''; 
    }
  } else {
    alert("Password is incorrect");
  }
}
}

function viewTransactions() {  
  const storedUserString = localStorage.getItem("currentUser"); 
    if (storedUserString) {
        currentUser = JSON.parse(storedUserString);}

  const transDetails = document.getElementById('transaction-list');
  transDetails.innerHTML = '<h4>Transaction History:</h4>';
  if (currentUser.transactions.length === 0) {
    transDetails.innerHTML += '<p>No transactions found.</p>';
    return;
  }
  const startIndex = Math.max(currentUser.transactions.length - 5, 0);
  for (let i = currentUser.transactions.length - 1; i >= startIndex; i--) {
    const transaction = currentUser.transactions[i];
    const transactionElement = document.createElement('p');
    transactionElement.innerHTML = `${new Date(transaction.date).toLocaleString()} - ${transaction.type} - ₹${transaction.amount} ${transaction.recipient ? 'to ' + transaction.recipient : ''}`;
    transDetails.appendChild(transactionElement);
  }
}
  


