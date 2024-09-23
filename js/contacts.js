const urlBase = 'http://lampstack.smallprojectfifteen.xyz/LAMPAPI';
const extension = 'php';

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
    var popup = document.getElementById("addPopup");
    popup.style.display = "none";

    toggleBlur();
}

function createContact() {
    let contactName = document.getElementById("iname").value;
    let email = document.getElementById("iemail").value;
    let phoneNum = document.getElementById("itel").value;

    let tmp = { contactName: contactName, email: email, phoneNum: phoneNum };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/createContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);


				//if (jsonObject.error) {
				//	document.getElementById("loginResult").innerHTML = "Unable to create account";
				//	return;
				//}

				//document.getElementById("loginResult").innerHTML = "Account Created Succsessfully, Please Login ";

				//      newname = jsonObject.newname;
				//      newpassword = jsonObject.newpassword;

				//saveCookie();

			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		//document.getElementById("loginResult").innerHTML = err.message;
	}
}