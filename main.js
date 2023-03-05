let expList = document.getElementById("expenseList");
let totalExpense = document.getElementById("totalExpense");

async function addExpense(event) {
  event.preventDefault();

  let amount = document.getElementById("amount").value;
  let descp = document.getElementById("desc").value;

  let expData = {
    amount,
    descp,
  };

  try {
    const res = await axios.post(
      "https://crudcrud.com/api/a539a6eabd8b4e93881fd69703b34b23/expDataBase",
      expData
    );
    showUserDetails(res.data);

    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    calculateTotalExpense();
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/a539a6eabd8b4e93881fd69703b34b23/expDataBase"
    );
    for (let i = 0; i < res.data.length; i++) {
      showUserDetails(res.data[i]);
    }
    calculateTotalExpense();
  } catch (err) {
    console.error(err);
  }
});

function showUserDetails(jsonData) {
  let output = `<li id=${jsonData._id}>${jsonData.amount} : ${jsonData.descp} 
  <button onclick=delExp('${jsonData._id}')>Delete Expense</button</li>`;
  expList.innerHTML = expList.innerHTML + output;
}

async function delExp(id) {
  try {
    const res = await axios.delete(
      "https://crudcrud.com/api/a539a6eabd8b4e93881fd69703b34b23/expDataBase/" +
        id
    );
    removeUser(id);
    calculateTotalExpense();
  } catch (err) {
    console.error(err);
  }
}

function removeUser(id) {
  expList.removeChild(document.getElementById(id));
}

function calculateTotalExpense() {
  let expenseItems = document.querySelectorAll("#expenseList li");
  let total = 0;
  for (let i = 0; i < expenseItems.length; i++) {
    let expenseAmount = parseFloat(
      expenseItems[i].textContent.split(":")[0].trim()
    );
    total += expenseAmount;
  }
  totalExpense.textContent = total.toFixed(2);
}
