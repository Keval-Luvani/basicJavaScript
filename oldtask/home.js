var totalEmployee = 0;
var create = true;
window.onload = function () {
  let employeeList = JSON.parse(localStorage.getItem("employeeList"));
  totalEmployee = employeeList.length;
  addRows(employeeList);
  addColumns(employeeList);
};

function addEmployee(event) {
  event.preventDefault();
  var employeeId = document.getElementById("employeeId").value;
  var name = document.getElementById("name").value;
  if (document.getElementById("gender1").checked) {
    var gender = "male";
  } else {
    var gender = "female";
  }
  var dob = document.getElementById("dateofbirth").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var hobbies = getHobbies();
  var employee = getObject(name, gender, dob, email, phone, hobbies);

  if (formValidation(employee, employeeId)) {
    var employeeList = JSON.parse(localStorage.getItem("employeeList"));

    if (!employeeId == "") {
      employeeList[employeeId] = employee;
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      create = false;
      addRow(employeeId, employee);
      addColumn(employeeId, employee);
      create = true;
      return;
    }
    employeeId = totalEmployee++;
    addRow(employeeId, employee);
    addColumn(employeeId, employee);
    employeeList.push(employee);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
  }
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

function getObject(name, gender, dob, email, phone, hobbies) {
  const employee = {
    name: name,
    gender: gender,
    dob: dob,
    email: email,
    phone: phone,
    hobbies: hobbies,
  };
  return employee;
}

function addRows(employeeList) {
  var tbody = document.querySelector("tbody");
  var employeeId = 0;
  for (var employee of employeeList) {
    var row = tbody.insertRow();
    row.insertCell().innerHTML = employee.name;
    row.insertCell().innerHTML = employee.gender;
    row.insertCell().innerHTML = employee.dob;
    row.insertCell().innerHTML = employee.email;
    row.insertCell().innerHTML = employee.phone;
    row.insertCell().innerHTML = employee.hobbies;
    row.insertCell().innerHTML = getActions(employeeId++);
  }
}
function addColumns(employeeList) {
  var nameRow = document.getElementById("nameRow");
  var genderRow = document.getElementById("genderRow");
  var dobRow = document.getElementById("dobRow");
  var emailRow = document.getElementById("emailRow");
  var phoneRow = document.getElementById("phoneRow");
  var hobbiesRow = document.getElementById("hobbiesRow");
  var actionRow = document.getElementById("actionRow");
  var employeeId = 0;
  for (var employee of employeeList) {
    nameRow.insertCell().innerHTML = employee.name;
    genderRow.insertCell().innerHTML = employee.gender;
    dobRow.insertCell().innerHTML = employee.dob;
    emailRow.insertCell().innerHTML = employee.email;
    phoneRow.insertCell().innerHTML = employee.phone;
    hobbiesRow.insertCell().innerHTML = employee.hobbies;
    actionRow.insertCell().innerHTML = getActions(employeeId++);
  }
}

function getActions(employeeId) {
  var actions =
    '<button class="updateButton" onClick="updateEmployee(' +
    employeeId +
    ')">Update</button><button onClick="deleteEmployee(' +
    employeeId +
    ')">Delete</button>';
  return actions;
}

function updateEmployee(employeeId) {
  var employeeList = JSON.parse(localStorage.getItem("employeeList"));
  var employee = employeeList[employeeId];
  document.getElementById("employeeId").value = employeeId;
  document.getElementById("name").value = employee.name;
  if (employee.gender == "male") {
    document.getElementById("gender1").checked = true;
  } else {
    document.getElementById("gender2").checked = true;
  }

  document.getElementById("dateofbirth").value = employee.dob;
  document.getElementById("email").value = employee.email;
  document.getElementById("phone").value = employee.phone;
  setHobbies(employee.hobbies.split(" "));
}
function addRow(employeeId, employee) {
  employeeId = parseInt(employeeId) + 1;
  console.log("employye id" + employeeId);
  console.log("totalEmployee" + totalEmployee);

  if (create) {
    var tbody = document.querySelector("tbody");
    var row = tbody.insertRow();
    row.insertCell().innerHTML = employee.name;
    row.insertCell().innerHTML = employee.gender;
    row.insertCell().innerHTML = employee.dob;
    row.insertCell().innerHTML = employee.email;
    row.insertCell().innerHTML = employee.phone;
    row.insertCell().innerHTML = employee.hobbies;
    row.insertCell().innerHTML = getActions(employeeId);
  } else {
    console.log("employee id in update horizontal : " + employeeId);
    var horizontalTable = document.getElementById("horizontalTable");
    horizontalTable.deleteRow(employeeId);
    var row = horizontalTable.insertRow(employeeId);
    row.insertCell().innerHTML = employee.name;
    row.insertCell().innerHTML = employee.gender;
    row.insertCell().innerHTML = employee.dob;
    row.insertCell().innerHTML = employee.email;
    row.insertCell().innerHTML = employee.phone;
    row.insertCell().innerHTML = employee.hobbies;
    row.insertCell().innerHTML = getActions(employeeId);
  }
}

function addColumn(employeeId, employee) {
  var nameRow = document.getElementById("nameRow");
  var genderRow = document.getElementById("genderRow");
  var dobRow = document.getElementById("dobRow");
  var emailRow = document.getElementById("emailRow");
  var phoneRow = document.getElementById("phoneRow");
  var hobbiesRow = document.getElementById("hobbiesRow");
  var actionRow = document.getElementById("actionRow");

  if (create) {
    nameRow.insertCell().innerHTML = employee.name;
    genderRow.insertCell().innerHTML = employee.gender;
    dobRow.insertCell().innerHTML = employee.dob;
    emailRow.insertCell().innerHTML = employee.email;
    phoneRow.insertCell().innerHTML = employee.phone;
    hobbiesRow.insertCell().innerHTML = employee.hobbies;
    actionRow.insertCell().innerHTML = getActions(employeeId);
  } else {
    employeeId = parseInt(employeeId) + 1;
    nameRow.cells[employeeId].innerHTML = employee.name;
    genderRow.cells[employeeId].innerHTML = employee.gender;
    dobRow.cells[employeeId].innerHTML = employee.dob;
    emailRow.cells[employeeId].innerHTML = employee.email;
    phoneRow.cells[employeeId].innerHTML = employee.phone;
    hobbiesRow.cells[employeeId] = employee.hobbies;
    actionRow.cells[employeeId].innerHTML = getActions(employeeId);
  }
}

function deleteEmployee(employeeId) {
  var employeeList = JSON.parse(localStorage.getItem("employeeList"));
  employeeList.splice(employeeId, 1);
  localStorage.setItem("employeeList", JSON.stringify(employeeList));
  totalEmployee--;
  deleteRowAndColumn(employeeId);
}
function deleteRowAndColumn(employeeId) {
  employeeId = parseInt(employeeId) + 1;
  console.log("view Delete EmployeeId" + employeeId);
  var horizontalTable = document.getElementById("horizontalTable");
  horizontalTable.deleteRow(employeeId);
  document.getElementById("nameRow").deleteCell(employeeId);
  document.getElementById("genderRow").deleteCell(employeeId);
  document.getElementById("dobRow").deleteCell(employeeId);
  document.getElementById("emailRow").deleteCell(employeeId);
  document.getElementById("phoneRow").deleteCell(employeeId);
  document.getElementById("hobbiesRow").deleteCell(employeeId);
  document.getElementById("actionRow").deleteCell(employeeId);
}

//Email Validation
function validateEmail(email) {
  var len = 0;
  var i = 0;
  var a = false;
  var dot = false;
  var valid = false;
  while (i < email.length) {
    if (email.charAt(i) == "@") {
      a = true;
      break;
    }
    i++;
    len++;
  }
  if (!(len < 1) && a) {
    return false;
  }
  len == 0;
  while (i < email.length) {
    if (email.charAt(i) == "@") {
      return false;
    }
    if (email.charAt(i) == ".") {
      dot = true;
      break;
    }
    i++;
    len++;
  }
  if (!(len < 1) && dot) {
    return false;
  }
  len == 0;
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
  return true;
}

function formValidation(employee, employeeId) {
  var emailError = document.getElementById("emailError");
  var dobError = document.getElementById("dateofbirthError");
  var phoneError = document.getElementById("phoneError");
  var nameError = document.getElementById("nameError");

  emailError.innerText = "";
  dobError.innerText = "";
  phoneError.innerText = "";
  nameError.innerText = "";
  var valid = true;

  if (employee.name == "") {
    nameError.innerText = "required";
    valid = false;
  } else if (employee.name.length < 4 || employee.name.length > 20) {
    console.log(employee.name.length);
    nameError.innerText = "name length should be between 4 to 20";
    valid = false;
  }

  if (employee.email == "") {
    emailError.innerText = "required";
    valid = false;
  } else if (validateEmail(employee.email)) {
    emailError.innerText = "Enter Valid Email";
    valid = false;
  }

  if (employeeId == "") {
    var employeeList = JSON.parse(localStorage.getItem("employeeList"));
    for (var e of employeeList) {
      if (e.email == employee.email) {
        emailError.innerText = "user already exists";
        valid = false;
      }
    }
  }

  if (employee.dob == "") {
    dobError.innerText = "required";
    valid = false;
  } else if (new Date(employee.dob) > new Date()) {
    dobError.innerText = "future date not allowed";
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
