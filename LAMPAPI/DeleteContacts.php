
<?php
    $inData = getRequestInfo();

    $name = "";
    $phone = 0;
    $email = "";
    $userId = 0;

    $conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");
    if( $conn->connect_error ) {
        returnWithError( $conn->connect_error );
    } else {
        $stmt = $conn->prepare("DELETE FROM contacts WHERE Name=?");
        if($stmt) {
            $stmt->bind_param("s", $inData["name"]);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                // returnWithInfo($inData["name"], $inData["phone"], $inData["email"], $inData["userId"]);
            } else {
                returnWithError("No Records Found");
            }

            $stmt->close();
    } else {
        returnWithError($conn->error);
    }
        $conn->close();
    }

    function getRequestInfo() {
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj ) {
		header('Content-type: application/json');
		echo $obj;
	}

    function returnWithError( $err ) {
		$retValue = '{"name":"", "phone": 0, "email":"", "userId": 0, error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    // function returnWithInfo( $name, $phone, $email, $userId ) {
	// 	$retValue = '{"name":' . $name . '","phone":"' . $phone . '", "email":"' . $email . '", "userId":' . $userId . '""error":""}';
	// 	sendResultInfoAsJson( $retValue );
	// }
?>
