document.addEventListener("DOMContentLoaded", function () {
    const openModal = document.getElementById("add");
    const closeModal = document.getElementById("close");
    const modal = document.getElementById("modal");

    openModal.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

});