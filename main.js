let expList = document.getElementById("expenseList");

function addExpense(event) {
  event.preventDefault();

  let amount = document.getElementById("amount").value;
  let descp = document.getElementById("desc").value;

  let expData = {
    amount,
    descp,
  };

  axios
    .post(
      "https://crudcrud.com/api/484cf1f1ee7b444dabd451f1a49ac41a/expDataBase",
      expData
    )
    .then((res) => {
      showUserDetails(res.data);

      let totalExpense = parseFloat(
        document.getElementById("totalExpense").textContent
      );
      document.getElementById("amount").value = "";
      document.getElementById("desc").value = "";
      calculateTotalExpense();
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/484cf1f1ee7b444dabd451f1a49ac41a/expDataBase"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        showUserDetails(res.data[i]);
      }
    });
});

function showUserDetails(jsonData) {
  let output = `<li id=${jsonData._id}>${jsonData.descp} ->  ${jsonData.amount}
  <button onclick=edtExp('${jsonData._id}','${jsonData.amount}','${jsonData.descp}')>Edit</button>
  <button onclick=delExp('${jsonData._id}')>Delete Expense</button</li>`;
  expList.innerHTML = expList.innerHTML + output;
  calculateTotalExpense();
}

function delExp(id) {
  axios
    .delete(
      "https://crudcrud.com/api/484cf1f1ee7b444dabd451f1a49ac41a/expDataBase/" +
        id
    )
    .then((res) => {
      removeUser(id);
      calculateTotalExpense();
    });
}

function removeUser(id) {
  expList.removeChild(document.getElementById(id));
}

function edtExp(id, amt, des, categ) {
  document.getElementById("amount").value = amt;
  document.getElementById("desc").value = des;
  removeUser(id);
}

function calculateTotalExpense() {
  let expenseItems = document.querySelectorAll("#expenseList li");
  let totalExpense = 0;
  for (let i = 0; i < expenseItems.length; i++) {
    let expenseAmount = parseFloat(
      expenseItems[i].textContent.split("->")[1].trim()
    );
    totalExpense += expenseAmount;
  }
  document.getElementById("totalExpense").textContent = totalExpense.toFixed(2);
}
