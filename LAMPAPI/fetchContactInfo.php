<?php
	$inData = getRequestInfo();

	//Establish connection
	$conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 

	$ID = $inData["contactId"];

	$stmt = $conn->prepare("SELECT FirstName, LastName, Email, Phone FROM contacts WHERE ID = ?");
	$stmt->bind_param("s", $ID);
	$stmt->execute();
	$result = $stmt->get_result();

	if($result->num_rows > 0) {
		$row = $result->fetch_assoc();

		echo "<div class='contact-box'>
				<div class='contact-content'>
					<div class='contact-photo'>
						<i class='material-icons'>person</i>
					</div>
					<div class='contact-details'>
						<p id='acontactfirstname' data-value=" . htmlspecialchars($row['FirstName']) . "><strong>First Name:</strong> " . htmlspecialchars($row['FirstName']) . "</p>
						<p id='acontactlastname' data-value=" . htmlspecialchars($row['LastName']) . "><strong>Last Name:</strong> " . htmlspecialchars($row['LastName']) . "</p>
						<p id='acontactemail' data-value=" . htmlspecialchars($row['Email']) . "><strong>Email:</strong> " . htmlspecialchars($row['Email']) . "</p>
						<p id='acontactphone'  data-value=" . htmlspecialchars($row['Phone']) . "><strong>Phone:</strong> " . htmlspecialchars($row['Phone']) . "</p>
					</div>
				</div>
				<div class='contact-buttons'>
					<button class='update-btn' onclick='showUpdatePopup(" . $ID . ")'>Update</button>
					<button class='delete-btn' onclick='deleteContact(" . $ID . ")'>Delete</button>
				</div>
              </div>";
	} else {
		echo "<p>Contact not found.</p>";
	}

	$stmt->close();

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"contactName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	$conn->close();
?>