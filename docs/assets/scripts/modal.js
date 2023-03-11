/***********************************************
 * This is an extension of Bulma; Bulma must be included on the site to use this
 * Add this js file to any webpage to enable a modal dialog that you can call using the openModal method
 ***********************************************/
window.addEventListener("load", () => {
    AddModalElement()
});

let modalDiv;
let modalContent;

function AddModalElement() {
    const htmlEL = document.querySelector("body");

    modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");

    let backgrounDiv = document.createElement("div");
    backgrounDiv.classList.add("modal-background");
    backgrounDiv.addEventListener("click", closeModal);
    modalDiv.appendChild(backgrounDiv);

    modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "card", "p-5");
    modalDiv.appendChild(modalContent);

    let closeButton = document.createElement("button");
    closeButton.classList.add("modal-close", "is-large");
    closeButton.setAttribute("aria-label", "close");
    closeButton.addEventListener("click", closeModal);
    modalDiv.appendChild(closeButton);

    htmlEL.appendChild(modalDiv);
};

function closeModal() {
    modalDiv.classList.remove("is-active");
};

function openModal(contentEL) {
    modalContent.innerHTML = "";

    modalContent.appendChild(contentEL);

    modalDiv.classList.add("is-active");
};