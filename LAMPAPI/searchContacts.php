<?php
	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

    // Establish connection
	$conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        // If we successfully connect, bind the parameters appropriately
		$stmt = $conn->prepare("select FirstName, LastName, Email, Phone, ID from contacts where ( (FirstName like ? OR LastName like ? OR Email like ? OR Phone like ?) ) and UserID=?");
        $search = "%" . $inData["search"] . "%";
		$stmt->bind_param("sssss", $search, $search, $search, $search, $inData["userId"]);
		$stmt->execute();

        $result = $stmt->get_result();

        while($row = $result->fetch_assoc())
        {
            if($searchCount > 0)
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"firstName" : "' . $row["FirstName"] . '", "lastName" : "' . $row["LastName"] . '", "phoneNum" : "' . $row["Phone"] . '", "email" : "' . $row["Email"] . '", "id" : "' . $row["ID"] . '"}';
        }

        if ($searchCount == 0)
        {
            returnWithError("No Contact Found");
        }
        else
        {
            returnWithInfo($searchResults);
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
		$retValue = '{"id":0,"contactName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
    function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
