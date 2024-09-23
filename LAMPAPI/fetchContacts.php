<?php
    $inData = getRequestInfo();

// Establish connection
	$conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 

		$userId = $inData["iduser"];

        //echo "Received userId: " . $userId; //DEBUG

		//Fetch contacts
		$sql = "SELECT ID, FirstName, LastName FROM contacts WHERE userId = ?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param("s", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if any contacts exist
        if ($result->num_rows > 0) {
            // Generate the HTML for each contact dynamically
            while ($row = $result->fetch_assoc()) {
                $contactId = htmlspecialchars($row['ID']);
                $firstName = htmlspecialchars($row['FirstName']);
                $lastName = htmlspecialchars($row['LastName']);

                echo '
                <div class="examplecontact" data-contact-id="' . $contactId . '" onclick="loadContactDetails(' . $contactId . ')">
                    <i class="material-icons">person</i>
                    <p>' . $firstName . ' ' . $lastName . '</p>
                </div>';
            }
        } else {
            echo '<p> No contacts found.</p>';
        }

        $stmt->close();

    $conn->close();

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"contactName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>