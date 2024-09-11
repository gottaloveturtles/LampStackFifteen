//const urlBase = 'http://lampstack.smallprojectfifteen.xyz/LAMPAPI';
const urlBase = 'http://COP4331-5.com/LAMPAPI';
const extension = 'php';

let iduser = 0;
let fname = "";
let lname = "";


// function a and b are linked 
function create() {
    var popup = document.getElementById("popup");
    popup.style.display = "block"; // Makes the popup visible
}

//creates accunt after hiding the popup to create account
function hidePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // Hides the popup


	let newname = document.getElementById("newname").value;
	let newpassword = document.getElementById("newpassword").value;
	let email = document.getElementById("email").value;
	let phone = document.getElementById("phone").value;


	document.getElementById("loginResult").innerHTML = "";

	let tmp = {newname:newname,newpassword:newpassword, email:email, phone:phone};
	let jsonPayload = JSON.stringify( tmp );


	let url = urlBase + '/CreateAccount.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				
		
				if(jsonObject.error)
				{		
					document.getElementById("loginResult").innerHTML = "Unable to create account";
					return;
				}

				document.getElementById("loginResult").innerHTML = "Account Created Succsessfully, Please Login ";
		
				newname = jsonObject.newname;
				newpassword = jsonObject.newpassword;

				//saveCookie();
	
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}


function doLogin()
{
		iduser = 0;
	fname = "";
	lname = "";

	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
	let jsonPayload = JSON.stringify( tmp );


	let url = urlBase + '/Login.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				iduser = jsonObject.id;
		
				if( iduser < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "Incorrect username or password";
					return;
				}
		
				fname = jsonObject.fname;
				lname = jsonObject.lname;

				//saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

	//window.location.href = "contacts.html";
}





function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "fname=" + fname + ",lname=" + lname + ",iduser=" + iduser + ";expires=" + date.toGMTString();
}

function readCookie()
{
	iduser = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "fname" )
		{
			fname = tokens[1];
		}
		else if( tokens[0] == "lname" )
		{
			lname = tokens[1];
		}
		else if( tokens[0] == "iduser" )
		{
			iduser = parseInt( tokens[1].trim() );
		}
	}
	
	if( iduser < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + fname + " " + lname;
	}
}


