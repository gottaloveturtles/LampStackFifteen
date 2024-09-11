
<?php

    // Sets up user input retrieval variable
    $inData = getRequestInfo();

    // Initialize varibles
    $id = 0;
    $firstName = "";
    $lastName = "";

    // Connect to contactManager database
    $conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");

    // Check for connection error
    if( $conn->connect_error ) {
		returnWithError( $conn->connect_error );
	} else {

        // Retrieves the input login/password and compares to the users table in the database for a match
        $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM users WHERE Login=? AND Password=?");
        $stmt->bind_param("ss", $inData["login"], $inData["password"]);
        $stmt->execute();
        $result = $stmt->get_result();
        
        // If a match is found, return firstName, lastName, and ID to the cliant as JSON
        if( $row = $result->fetch_assoc() ) {
            returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
        } else {
            // If match is not found, returns JSON with empty propeties and an error string
            returnWithError("No Records Found");
        }

        // Closes prepared statment
        $stmt->close();

        // Closes database connection
        $conn->close();
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

     // Function formats a JSON string with empty properties along with an error string
    function returnWithError( $err ) {
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    // Function returns info formatted as a JSON string
    function returnWithInfo( $firstName, $lastName, $id ) {
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
