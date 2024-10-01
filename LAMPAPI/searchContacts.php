<?php
	ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $inData = getRequestInfo();
    $searchCount = 0;
    $searchResults = '';

    // Establish connection
    $conn = new mysqli("localhost", "root", "83EuRJ+A1MJW", "contactManager");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
        exit();
    }

    // Trim and sanitize search input
    $search = "%" . trim($conn->real_escape_string($inData["search"])) . "%";

    $stmt = $conn->prepare("SELECT FirstName, LastName, Email, Phone, ID FROM contacts 
                            WHERE (CONCAT_WS(' ', FirstName, LastName) LIKE ? 
                                   OR FirstName LIKE ? 
                                   OR LastName LIKE ? 
                                   OR Email LIKE ? 
                                   OR Phone LIKE ?)
                            AND UserID=?");

    $stmt->bind_param("ssssss", $search, $search, $search, $search, $search, $inData["userId"]);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $contactId = $row["ID"];
        $firstName = htmlspecialchars($row["FirstName"]);
        $lastName = htmlspecialchars($row["LastName"]);
        $email = htmlspecialchars($row["Email"]);
        $phone = htmlspecialchars($row["Phone"]);

        $searchResults .= '
        <div class="examplecontact" data-contact-id="' . $contactId . '" onclick="loadContactDetails(' . $contactId . ')">
            <i class="material-icons">person</i>
            <p>' . $firstName . ' ' . $lastName . '</p>
        </div>';
        
        $searchCount++;
    }

    if ($searchCount == 0) {
        $searchResults = '<p>No contacts found</p>';
    }

    echo $searchResults;

    $stmt->close();
    $conn->close();

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function returnWithError($err) {
        echo '<p>Error: ' . $err . '</p>';
    }
?>
