<?php
	$inData = getRequestInfo();
	
    // Attributes of each contact
    	$contactId = $inData["contactId"];
	$userId = $inData["userId"];
	$firstName = $inData["firstName"];
    	$lastName = $inData["lastName"];
	$email = $inData["email"];
    	$phoneNum = $inData["phoneNum"];

    // Establish connection
    	$conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        // If we successfully connect, bind the parameters appropriately
		$stmt = $conn->prepare("UPDATE contacts SET FirstName=?, LastName=?, Email=?, Phone=? where ID = ?");
		$stmt->bind_param("sssss", $firstName, $lastName, $email, $phoneNum, $contactId);
		
		if ($stmt->execute())
		{
			returnWithError("");
		}
		else
		{
			returnWithError("Could not update contact.");
		}
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
