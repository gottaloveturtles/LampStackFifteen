<?php
	$inData = getRequestInfo();
	
    // Attributes of each contact
	$userId = $inData["userId"];
	$contactName = $inData["contactName"];
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
		$stmt = $conn->prepare("INSERT into contacts (UserId, Name, Email, Phone) VALUES(?, ?, ?, ?)");
		$stmt->bind_param("ssss", $userId, $contactName, $email, $phoneNum);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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