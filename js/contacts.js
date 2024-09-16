function toggleBlur() {
    var toptab = document.getElementById("toptab");
    var viewport = document.getElementById("viewport");
    toptab.classList.toggle("blur");
    viewport.classList.toggle("blur");
}

function showAddPopup() {
    var popup = document.getElementById("addPopup");
    popup.style.display = "block";

    toggleBlur();
}

function hideAddPopup() {
    var popup = document.getElementById("addPopup");
    popup.style.display = "none";

    toggleBlur();
}