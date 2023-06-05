const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
// const dummyData = [
//     /*{  description: "Book", amount: 10 },
//     {  description: "Camera", amount: -1 },
//     {  description: "Petrol", amount: -2 },*/
//   ];
//   //dummyData=transactions.map(function(transaction){return{y:transaction.id,x:transaction.description};});
//   function calGraph(){
// JSC.Chart('chartDiv', {
//     type: 'horizontal column',
//     series: [
//        {
//           points:dummyData
//              //{x: dummyData[0].description, y:dummyData[0].amount},
//             //  {x: 'Oranges', y: 42},
//             //  {x: 'Ora', y: 100},
//             //  {x: 'Oran', y: -12}
          
            
          
//        }
//     ]
//  });
// }
// JSC.Chart('chartDiv', {
//     type: 'horizontal column',
//     series: [
//        {
//           points:dummyData
//              //{x: dummyData[0].description, y:dummyData[0].amount},
//             //  {x: 'Oranges', y: 42},
//             //  {x: 'Ora', y: 100},
//             //  {x: 'Oran', y: -12}
          
            
          
//        }
//     ]
//  });
// /*
// const dummyData = [
//   { id: 1, description: "Flower", amount: -20 },
//   { id: 2, description: "Salary", amount: 35000 },
//   { id: 3, description: "Book", amount: 10 },
//   { id: 4, description: "Camera", amount: -150 },
//   { id: 5, description: "Petrol", amount: -250 },
// ];

// let transactions = dummyData;


const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [];

function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");
  item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
    <button class="btn-edit" onclick="editTrans(${transaction.id})">edit</button>
  `;
  trans.appendChild(item);
  //console.log(transaction);
}
function editTrans(id)
{

     const amount1=parseInt(prompt("enter new money"));
     console.log(amount1);
     if(amount1)
     {
     const td= transactions.filter((transaction) => transaction.id == id);
     td[0].amount=amount1;
     console.log(td[0]);
     config();
     updateLocalStorage();
     }
     else{
        return;
     }
   
 }

function removeTrans(id) {
  if (confirm("Are you sure you want to delete Transcation?")) {
    
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  } else {
    return;
  }
}

function updateAmount() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  balance.innerHTML = `₹  ${total}`;

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  inc_amt.innerHTML = `₹  ${income}`;

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  exp_amt.innerHTML = `₹  ${Math.abs(expense)}`;
}
function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  
  updateAmount();
}

function addTransaction(e) {
  e.preventDefault();
  console.log(e);
  if (description.value.trim() == "" || amount.value.trim() == "") {
    alert("Please Enter Description and amount");
  } else {
    const transaction = {
      id: uniqueId(),
      description: description.value,
      amount: +amount.value,
    };
    
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    // for(i=0;i<transactions.length;i++)
    // {
    //     const kd={
    //         x:transactions[i].description,
    //         y:transactions[i].value,
    //     }
    //     dummyData.push(kd);
    // }
    
    // calGraph();
    description.value = "";
    amount.value = "";
    updateAmount();
    updateLocalStorage();
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 10000000);
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load", function () {
  config();
});

function updateLocalStorage() {
  localStorage.setItem("trans", JSON.stringify(transactions));
}