
<?php
    
    // Sets up user input retrieval variable
    $inData = getRequestInfo();

    // Connect to contactManager database
    $conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");

    // Check for connection error
    if( $conn->connect_error ) {
        returnWithError( $conn->connect_error );
    } else {
        // Deletes the row that matches the input ID
        $stmt = $conn->prepare("DELETE FROM contacts WHERE ID=?");
        
        if($stmt) {

            $stmt->bind_param("s", $inData["ID"]); 

            $stmt->execute();

            // Checks if any row was affected. If yes, return a success message. If no, return error message
            if ($stmt->affected_rows > 0) {
                $retValue = '{"success": true, "return": "Deletion successful"}';
                sendResultInfoAsJson( $retValue );
            } else {
                returnWithError("No Records Found");
            }

            // Closes prepared statment
            $stmt->close();
        } else {
        returnWithError($conn->error);
        }
        // Closes database connection
        $conn->close();
    }

    // Function decodes the recieved JSON data
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
        $retValue = '{"ID":"", error":"' . $err . '"}';	
		sendResultInfoAsJson( $retValue );
	}
?>
