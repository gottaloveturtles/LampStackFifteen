const urlBase = "http://lampstack.smallprojectfifteen.xyz/LAMPAPI";
//const urlBase = 'http://COP4331-5.com/LAMPAPI';
const extension = "php";

let iduser = 0;
let fname = "";
let lname = "";


/*
function doLogin()
{       window.location.href = "dashboard.html";}
*/
let counter = 0;

// Simulate login success and redirect with loader
function handlelogin() {
  if (counter == 1) {
    // Show the loader
    document.getElementById('bouncing-dots').style.display = 'flex'; // Ensure bouncing dots are displayed
    document.getElementById('loader-container').style.display = 'flex'; // Ensure loader container is displayed
	//document.getElementById("firstnamelogin").innerHTML = fname;
    // Simulate loading time, then redirect
    setTimeout(function() {
      window.location.href = "dashboard.html"; // Redirect to the main page
    }, 3000); // 3-second delay (or any duration you prefer)
  } else {
    // Handle login failure (e.g., show error message)
    alert('Login failed. Please try again.');
  }
}





function doLogin() {
  iduser = 0;
  fname = "";
  lname = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;

  document.getElementById("loginResult").innerHTML = "";

  let tmp = { login: login, password: password };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        iduser = jsonObject.id;

        if (iduser < 1) {
          document.getElementById("loginResult").innerHTML =
            "Incorrect username or password";
			counter=0;
          return;
        }
 counter = 1;
        fname = jsonObject.firstName;
        lname = jsonObject.lastName;
          handlelogin();
        saveCookie();
       
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }

}

function logout() {
  iduser = 0;
  window.location.href = "index.html";
}
// function a and b are linked
function create() {
  var popup = document.getElementById("popup");
  popup.style.display = "block"; // Makes the popup visible
}

//creates accunt after hiding the popup to create account
function hidePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none"; // Hides the popup

  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  document.getElementById("loginResult").innerHTML = "";

  let tmp = {
    firstName: firstName,
    lastName: lastName,
    login: login,
    password: password,
  };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/CreateAccount." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.error) {
          document.getElementById("loginResult").innerHTML =
            "Unable to create account";
          return;
        }

        document.getElementById("loginResult").innerHTML =
          "Account Created Succsessfully, Please Login ";

        //      newname = jsonObject.newname;
        //      newpassword = jsonObject.newpassword;

        //saveCookie();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "fname=" +
    fname +
    ",lname=" +
    lname +
    ",iduser=" +
    iduser +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  iduser = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "fname") {
      fname = tokens[1];
    } else if (tokens[0] == "lname") {
      lname = tokens[1];
    } else if (tokens[0] == "iduser") {
      iduser = parseInt(tokens[1].trim());
    }
  }

  if (iduser < 0) {
    window.location.href = "index.html";
  } else {
    //              document.getElementById("userName").innerHTML = "Logged in as " + fname + " " + lname;
  }
}

function toggleBlur() {
  var toptab = document.getElementById("toptab");
  var viewport = document.getElementById("viewport");
  toptab.classList.toggle("blur");
  viewport.classList.toggle("blur");
}

function showAddPopup() {
  var popup = document.getElementById("addPopup");
  popup.style.display = "block";

  toggleBlur();
}

function hideAddPopup() {
    document.getElementById("contactfname").value = "";
    document.getElementById("contactlname").value = "";
    document.getElementById("contactphone").value = "";
    document.getElementById("contactemail").value = "";
    
  var popup = document.getElementById("addPopup");
  popup.style.display = "none";

  toggleBlur();
}

function hideFVPH() {
    var popup = document.getElementById("fvph");
    popup.style.display = "none";
}

function createcontact() {
  let contactfname = document.getElementById("contactfname").value;
  let contactlname = document.getElementById("contactlname").value;
  let contactphone = document.getElementById("contactphone").value;
  let contactemail = document.getElementById("contactemail").value;
  //document.getElementById("Createaccresult").innerHTML = "";
  let tmp = {
    firstName: contactfname,
    lastName: contactlname,
    phoneNum: contactphone,
    email: contactemail,
    userId: iduser,
  };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/createContact." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("Createaccresult").innerHTML = err.message;
    }

    hideAddPopup();
    loadContacts();
}

function deleteContact() {
    // Create a payload with the updated contact info and the contactId
    let payload = {
        ID: document.getElementById("dcontactid").getAttribute('data-value'), // This comes from the button click or from the contact list
    };

    let url = urlBase + "/DeleteContacts." + extension;

    // Send the updated data to the PHP server
    let jsonPayload = JSON.stringify(payload);

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //let jsonObject = JSON.parse(xhr.responseText);
        }
    };

    xhr.send(jsonPayload);

    hideDeletePopup();
    loadContacts();
    loadContactDetails(document.getElementById("dcontactid").getAttribute('data-value'));
}

function searchcontactlist() {
    let find = document.getElementById("searchCONTACT").value.trim();
    let tmp = { search: find, userId: iduser };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/searchContacts." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactslist").innerHTML = xhr.responseText;
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("contactslist").innerHTML = "Error retrieving contacts.";
    }
}

function updateContact() {
  // Collect updated values from input fields (e.g., first name, last name, etc.)
  let firstName = document.getElementById("ucontactfname").value;
  let lastName = document.getElementById("ucontactlname").value;
  let email = document.getElementById("ucontactemail").value;
  let phoneNum = document.getElementById("ucontactphone").value;

  // Create a payload with the updated contact info and the contactId
  let payload = {
    contactId: document.getElementById("ucontactid").getAttribute('data-value'), // This comes from the button click or from the contact list
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNum: phoneNum,
  };

  let url = urlBase + "/updateContact." + extension;

  // Send the updated data to the PHP server
  let jsonPayload = JSON.stringify(payload);

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsonObject = JSON.parse(xhr.responseText);
    }
  };

    xhr.send(jsonPayload);

    hideUpdatePopup();
    loadContacts();
    loadContactDetails(document.getElementById("ucontactid").getAttribute('data-value'));
}

async function loadContacts() {
    await delay(400);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + "/fetchContacts.php", true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let payload = {
        iduser: iduser,
    };

    let jsonPayload = JSON.stringify(payload);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("contactslist").innerHTML = xhr.responseText;
        }
    };

    xhr.send(jsonPayload);
}

async function loadContactDetails(contactId) {
    await delay(400);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + "/fetchContactInfo.php", true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let payload = {
        contactId: contactId,
    }

    let jsonPayload = JSON.stringify(payload);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("flexview").innerHTML = xhr.responseText;
        }
    };

    xhr.send(jsonPayload);
}

function showUpdatePopup(contactId) {
    var popup = document.getElementById("updatePopup");
    popup.style.display = "block";

    document.getElementById("ucontactfname").value = document.getElementById("acontactfirstname").getAttribute('data-value');
    document.getElementById("ucontactlname").value = document.getElementById("acontactlastname").getAttribute('data-value');
    document.getElementById("ucontactphone").value = document.getElementById("acontactphone").getAttribute('data-value');
    document.getElementById("ucontactemail").value = document.getElementById("acontactemail").getAttribute('data-value');
    document.getElementById("ucontactid").setAttribute('data-value', contactId);

    toggleBlur();
}

function hideUpdatePopup() {
    document.getElementById("ucontactfname").value = "";
    document.getElementById("ucontactlname").value = "";
    document.getElementById("ucontactphone").value = "";
    document.getElementById("ucontactemail").value = "";

    var popup = document.getElementById("updatePopup");
    popup.style.display = "none";

    toggleBlur();
}

function showDeletePopup(contactId) {
    var popup = document.getElementById("deletePopup");
    popup.style.display = "block";

    document.getElementById("dcontactid").setAttribute('data-value', contactId);

    toggleBlur();
}

function hideDeletePopup() {
    var popup = document.getElementById("deletePopup");
    popup.style.display = "none";

    toggleBlur();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function () {
    if (window.location.pathname.endsWith('dashboard.html')) {
        readCookie();
        //console.log("User ID: " + iduser); //DEBUG
        loadContacts();

        document.getElementById("searchCONTACT").addEventListener("input", searchcontactlist);
    }
}