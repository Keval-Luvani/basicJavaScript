var lastIndex = 0;
var create = true;

window.onload = function () {
  let employeeList = JSON.parse(localStorage.getItem("employeeList"));
  let totalEmployee = employeeList.length;

  if (totalEmployee != 0) {
    lastIndex = employeeList[totalEmployee - 1].id;
  }

  let todayDate = new Date().toISOString().split("T")[0];
  document.getElementById("dateofBirth").setAttribute("max", todayDate);
  addRows(employeeList);
  addColumns(employeeList);
};

function addEmployee(event) {
  event.preventDefault();
  var employeeForm = document.getElementById("employeeForm");
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var gender = document.getElementById("genderMale").checked
    ? "male"
    : "female";
  var dateofBirth = document.getElementById("dateofBirth").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var hobbies = getHobbies();

  if (id != "") {
    create = false;
  }

  var employee = getObject(
    id,
    name,
    gender,
    dateofBirth,
    email,
    phone,
    hobbies
  );

  if (formValidation(employee)) {
    var employeeList = JSON.parse(localStorage.getItem("employeeList"));
    if (!create) {
      let index = employeeList.findIndex((emp) => emp.id == employee.id);
      employeeList[index] = employee;
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      viewUpdateRow(employee);
      viewUpdateCoumn(employee);
      create = true;
      employeeForm.reset();
      return;
    }
    employeeList.push(employee);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    viewAddRow(employee);
    viewAddCoumn(employee);
    employeeForm.reset();
  }
}

function viewAddRow(employee) {
  var tbody = document.querySelector("tbody");
  var row = tbody.insertRow();
  row.setAttribute("id", "row" + employee.id);
  row.insertCell().innerHTML = employee.name;
  row.insertCell().innerHTML = employee.gender;
  row.insertCell().innerHTML = employee.dateofBirth;
  row.insertCell().innerHTML = employee.email;
  row.insertCell().innerHTML = employee.phone;
  row.insertCell().innerHTML = employee.hobbies;
  row.insertCell().innerHTML = getActions(employee.id);
}

function viewAddCoumn(employee) {
  var nameCell = document.getElementById("nameRow").insertCell();
  var genderCell = document.getElementById("genderRow").insertCell();
  var dateofBirthCell = document.getElementById("dateofBirthRow").insertCell();
  var emailCell = document.getElementById("emailRow").insertCell();
  var phoneCell = document.getElementById("phoneRow").insertCell();
  var hobbiesCell = document.getElementById("hobbiesRow").insertCell();
  var actionCell = document.getElementById("actionRow").insertCell();
  nameCell.setAttribute("id", "name" + employee.id);
  nameCell.innerHTML = employee.name;
  genderCell.setAttribute("id", "gender" + employee.id);
  genderCell.innerHTML = employee.gender;
  dateofBirthCell.setAttribute("id", "dateofBirth" + employee.id);
  dateofBirthCell.innerHTML = employee.dateofBirth;
  emailCell.setAttribute("id", "email" + employee.id);
  emailCell.innerHTML = employee.email;
  phoneCell.setAttribute("id", "phone" + employee.id);
  phoneCell.innerHTML = employee.phone;
  hobbiesCell.setAttribute("id", "hobbies" + employee.id);
  hobbiesCell.innerHTML = employee.hobbies;
  actionCell.setAttribute("id", "action" + employee.id);
  actionCell.innerHTML = getActions(employee.id);
}

function viewDeleteRow(employeeId) {
  var row = document.getElementById("row" + employeeId);
  var parent = row.parentNode;
  parent.removeChild(row);
}

function viewDeleteColumn(employeeId) {
  var nameCell = document.getElementById("name" + employeeId);
  var genderCell = document.getElementById("gender" + employeeId);
  var dateofBirthCell = document.getElementById("dateofBirth" + employeeId);
  var emailCell = document.getElementById("email" + employeeId);
  var phoneCell = document.getElementById("phone" + employeeId);
  var hobbiesCell = document.getElementById("hobbies" + employeeId);
  var actionCell = document.getElementById("action" + employeeId);
  nameCell.parentNode.removeChild(nameCell);
  genderCell.parentNode.removeChild(genderCell);
  dateofBirthCell.parentNode.removeChild(dateofBirthCell);
  emailCell.parentNode.removeChild(emailCell);
  phoneCell.parentNode.removeChild(phoneCell);
  hobbiesCell.parentNode.removeChild(hobbiesCell);
  actionCell.parentNode.removeChild(actionCell);
}

function viewUpdateRow(employee) {
  var row = document.createElement("tr");
  row.setAttribute("id", "row" + employee.id);
  row.insertCell().innerHTML = employee.name;
  row.insertCell().innerHTML = employee.gender;
  row.insertCell().innerHTML = employee.dateofBirth;
  row.insertCell().innerHTML = employee.email;
  row.insertCell().innerHTML = employee.phone;
  row.insertCell().innerHTML = employee.hobbies;
  row.insertCell().innerHTML = getActions(employee.id);
  var changedRow = document.getElementById("row" + employee.id);
  changedRow.replaceWith(row);
}

function viewUpdateCoumn(employee) {
  var employeeId = employee.id;
  document.getElementById("name" + employeeId).innerHTML = employee.name;
  document.getElementById("gender" + employeeId).innerHTML = employee.gender;
  document.getElementById("dateofBirth" + employeeId).innerHTML =
    employee.dateofBirth;
  document.getElementById("email" + employeeId).innerHTML = employee.email;
  document.getElementById("phone" + employeeId).innerHTML = employee.phone;
  document.getElementById("hobbies" + employeeId).innerHTML = employee.hobbies;
  document.getElementById("action" + employeeId).innerHTML =
    getActions(employeeId);
}

function addRows(employeeList) {
  var tbody = document.querySelector("tbody");
  for (var employee of employeeList) {
    var row = tbody.insertRow();
    row.setAttribute("id", "row" + employee.id);
    row.insertCell().innerHTML = employee.name;
    row.insertCell().innerHTML = employee.gender;
    row.insertCell().innerHTML = employee.dateofBirth;
    row.insertCell().innerHTML = employee.email;
    row.insertCell().innerHTML = employee.phone;
    row.insertCell().innerHTML = employee.hobbies;
    row.insertCell().innerHTML = getActions(employee.id);
  }
}

function addColumns(employeeList) {
  var nameRow = document.getElementById("nameRow");
  var genderRow = document.getElementById("genderRow");
  var dateofBirthRow = document.getElementById("dateofBirthRow");
  var emailRow = document.getElementById("emailRow");
  var phoneRow = document.getElementById("phoneRow");
  var hobbiesRow = document.getElementById("hobbiesRow");
  var actionRow = document.getElementById("actionRow");
  for (var employee of employeeList) {
    let nameCell = nameRow.insertCell();
    nameCell.innerHTML = employee.name;
    nameCell.setAttribute("id", "name" + employee.id);
    let genderCell = genderRow.insertCell();
    genderCell.innerHTML = employee.gender;
    genderCell.setAttribute("id", "gender" + employee.id);
    let dateofBirthCell = dateofBirthRow.insertCell();
    dateofBirthCell.innerHTML = employee.dateofBirth;
    dateofBirthCell.setAttribute("id", "dateofBirth" + employee.id);
    let emailCell = emailRow.insertCell();
    emailCell.innerHTML = employee.email;
    emailCell.setAttribute("id", "email" + employee.id);
    let phoneCell = phoneRow.insertCell();
    phoneCell.innerHTML = employee.phone;
    phoneCell.setAttribute("id", "phone" + employee.id);
    let hobbiesCell = hobbiesRow.insertCell();
    hobbiesCell.innerHTML = employee.hobbies;
    hobbiesCell.setAttribute("id", "hobbies" + employee.id);
    let actionCell = actionRow.insertCell();
    actionCell.innerHTML = getActions(employee.id);
    actionCell.setAttribute("id", "action" + employee.id);
  }
}

function getActions(employeeId) {
  var actions =
    '<div class="actions"><button class="updateButton" onClick="updateEmployee(' +
    employeeId +
    ')">Update</button><button class="deleteButton" onClick="deleteEmployee(' +
    employeeId +
    ')">Delete</button></div>';
  return actions;
}

function updateEmployee(employeeId) {
  var employeeList = JSON.parse(localStorage.getItem("employeeList"));
  var index = employeeList.findIndex((emp) => emp.id === employeeId);
  var employee = employeeList[index];

  document.getElementById("id").value = employee.id;
  document.getElementById("name").value = employee.name;
  if (employee.gender == "male") {
    document.getElementById("genderMale").checked = true;
  } else {
    document.getElementById("genderFemale").checked = true;
  }
  document.getElementById("dateofBirth").value = employee.dateofBirth;
  document.getElementById("email").value = employee.email;
  document.getElementById("phone").value = employee.phone;
  setHobbies(employee.hobbies.split(" "));
}

function deleteEmployee(employeeId) {
  var employeeList = JSON.parse(localStorage.getItem("employeeList"));
  let index = employeeList.findIndex((emp) => emp.id == employeeId);
  employeeList.splice(index, 1);
  localStorage.setItem("employeeList", JSON.stringify(employeeList));
  viewDeleteRow(employeeId);
  viewDeleteColumn(employeeId);
}

function getHobbies() {
  var hobbie1 = document.getElementById("hobbie1");
  var hobbie2 = document.getElementById("hobbie2");
  var hobbie3 = document.getElementById("hobbie3");
  var hobbie4 = document.getElementById("hobbie4");
  var result = " ";
  if (hobbie1.checked) {
    result = hobbie1.value + " ";
  }
  if (hobbie2.checked) {
    result = result + " " + hobbie2.value;
  }
  if (hobbie3.checked) {
    result = result + " " + hobbie3.value;
  }
  if (hobbie4.checked) {
    result = result + " " + hobbie4.value;
  }
  return result;
}

function setHobbies(hobbies) {
  var hobbie1 = document.getElementById("hobbie1");
  var hobbie2 = document.getElementById("hobbie2");
  var hobbie3 = document.getElementById("hobbie3");
  var hobbie4 = document.getElementById("hobbie4");
  hobbie1.checked = false;
  hobbie2.checked = false;
  hobbie3.checked = false;
  hobbie4.checked = false;
  var result = " ";
  if (hobbies.includes(hobbie1.value)) {
    hobbie1.checked = true;
  }
  if (hobbies.includes(hobbie2.value)) {
    hobbie2.checked = true;
  }
  if (hobbies.includes(hobbie3.value)) {
    hobbie3.checked = true;
  }
  if (hobbies.includes(hobbie4.value)) {
    hobbie4.checked = true;
  }
}

function getObject(id, name, gender, dateofBirth, email, phone, hobbies) {
  const employee = {
    id: id ? parseInt(id) : parseInt(++lastIndex),
    name: name,
    gender: gender,
    dateofBirth: dateofBirth,
    email: email,
    phone: phone,
    hobbies: hobbies,
  };
  return employee;
}

//Email Validation
function validateEmail(email) {
  var len = 0;
  var i = 0;
  var a = false;
  var dot = false;
  var valid = true;
  while (i < email.length) {
    if (email.charAt(i) == "@") {
      a = true;
      i++;
      break;
    }
    i++;
    len++;
  }
  if (!a) {
    return false;
  }
  if (len < 1) {
    return false;
  }
  len = 0;
  while (i < email.length) {
    if (email.charAt(i) == "@") {
      return false;
    }
    if (email.charAt(i) == ".") {
      dot = true;
      i++;
      break;
    }
    i++;
    len++;
  }
  if (!dot) {
    return false;
  }
  if (len < 1) {
    return false;
  }
  len = 0;
  while (i < email.length) {
    if (email.charAt(i) == ".") {
      return false;
    }
    i++;
    len++;
  }
  if (len < 1) {
    return false;
  }
  return valid;
}

function formValidation(employee, employeeId) {
  var emailError = document.getElementById("emailError");
  var dateofBirthError = document.getElementById("dateofBirthError");
  var phoneError = document.getElementById("phoneError");
  var nameError = document.getElementById("nameError");

  emailError.innerText = "";
  dateofBirthError.innerText = "";
  phoneError.innerText = "";
  nameError.innerText = "";
  var valid = true;

  if (employee.name == "") {
    nameError.innerText = "required";
    valid = false;
  } else if (employee.name.length < 4 || employee.name.length > 20) {
    nameError.innerText = "name length should be between 4 to 20";
    valid = false;
  }

  if (employee.email == "") {
    emailError.innerText = "required";
    valid = false;
  } else if (!validateEmail(employee.email)) {
    emailError.innerText = "Enter Valid Email";
    valid = false;
  }

  if (create) {
    var employeeList = JSON.parse(localStorage.getItem("employeeList"));
    for (var e of employeeList) {
      if (e.email == employee.email) {
        emailError.innerText = "user already exists";
        valid = false;
      }
    }
  }

  if (employee.dateofBirth == "") {
    dateofBirthError.innerText = "required";
    valid = false;
  } else if (new Date(employee.dateofBirth) > new Date()) {
    dateofBirthError.innerText = "future date not allowed";
    valid = false;
  }

  if (employee.phone != "") {
    if (employee.phone.length != 10) {
      phoneError.innerText = "Either enter 10 digit no or leave a blank";
      valid = false;
    } else if (employee.phone.charAt(0) == "0") {
      phoneError.innerText = "phone number can not start with 0";
      valid = false;
    } else {
      let i = 0;
      while (i < 10) {
        if (
          !(employee.phone.charAt(i) >= "0" && employee.phone.charAt(i) <= "9")
        ) {
          phoneError.innerText = "only numbers";
          valid = false;
          break;
        }
        i++;
      }
    }
  }

  return valid;
}
