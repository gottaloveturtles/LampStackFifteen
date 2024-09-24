
<?php

    // Sets up user input retrieval variable
    $inData = getRequestInfo();

    // Initialize varibles
    $id = 0;
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

    // Connect to contactManager database
    $conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");

    // Check for connection error
    if ( $conn->connect_error ){
        returnWithError( $conn->connect_error );
    } else {
        if( empty($login) || empty($password)){
            returnWithError("Login and password cannot be blank.");
            $conn->close();
            return;
        }
        // Retrieves the input firstName/lastName/login/password and inserts them into the users table in the database
        $stmt = $conn->prepare("INSERT into users (firstName,lastName,login,password) VALUES(?,?,?,?)");
        $stmt->bind_param("ssss", $firstName, $lastName, $login, $password);

        if($stmt->execute()) {
            // Closes prepared statment
            $stmt->close();

            // Closes database connection
            $conn->close();
            
            // Return an empty error, indicating that the connection was successful
            returnWithError("");
        } else {
            returnWithError("Error inserting user: " . $stmt->error);
        }
    }

    // Decodes the recieved JSON data
    function getRequestInfo() {
		return json_decode(file_get_contents('php://input'), true);
	}

    // Function returns final result to the client as a JSON
    function sendResultInfoAsJson( $obj ) {
		header('Content-type: application/json');
		echo $obj;
	}
	
    // Function formats a JSON string with an error string
	function returnWithError( $err ) {
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
