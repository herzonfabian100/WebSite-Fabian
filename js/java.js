const getPopupConfirmationWrapper = document.querySelector(
    "[data-form-confirmation-popup]"
);
const newPopupBox = document.createElement("div");
const exitPopupBtn = addStyling(document.createElement("button"), {
    type: "classList",
    tokenListMethod: "add",
    value: ["main_bg_color", "lead", "text-light", "border", "btn", "px-5"],
});
const form = document.querySelector("#contact form");
let popupBox, popupWrapper;
let newMessageObject = {
    _name: "",
    email: "",
    message: "",
};

function createMessage(name, email, message) {
    const receiptNum = receiptGenerator(6);

    const nameText = addStyling(document.createElement("p"), {
        type: "classList",
        tokenListMethod: "add",
        value: ["text-monospace", "h4"],
    });
    nameText.innerText = name;
    const emailText = addStyling(document.createElement("p"), {
        type: "classList",
        tokenListMethod: "add",
        value: ["text-monospace", "font-weight-bolder"],
    });
    emailText.innerText = email;
    const messageText = addStyling(document.createElement("p"), {
        type: "classList",
        tokenListMethod: "add",
        value: ["text-monospace", "text-muted"],
    });
    messageText.innerText = message;
    const info = document.createElement("p");

    info.innerHTML = `Thank you for your submission. Your receipt number is <span class="font-weight-bold text-monospace">${receiptNum}</span>. Please allow 10 to 15 days for a response. The following is a transcript of your form submission.`;

    return { nameText, emailText, messageText, info };
}

function receiptGenerator(receiptLength) {
    let receipt = "";
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (i = 0; i < receiptLength; i++) {
        receipt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return receipt.toString();
}

function addStyling(
    element,
    property = {
        type: "classList" || "id",
        tokenListMethod: "add" || "remove" || "toggle",
        value,
    }
) {
    if (property.type === "classList") {
        property.tokenListMethod === "add" ?
            (element.classList += Array.isArray(property.value) ?
                property.value.join(" ") :
                property.value) :
            property.tokenListMethod === "toggle" ?
            element.classList.toggle(property.value) :
            element.classList.remove(property.value);
        return element;
    } else {
        element.id = property.value;
        return element;
    }
}

form.addEventListener("submit", (evnt) => {
    // Stops the window from reloading
    evnt.preventDefault();
    newMessageObject = {
        _name: form.querySelector("#nameInput").value,
        email: form.querySelector("#emailInput").value,
        message: form.querySelector("#messageInput").value,
    };

    const { _name, email, message } = newMessageObject;

    popupWrapper = addStyling(getPopupConfirmationWrapper, {
        type: "classList",
        tokenListMethod: "toggle",
        value: "popup-container",
    });

    popupBox = addStyling(newPopupBox, {
        type: "id",
        value: "popup-wrapper",
    });

    if (popupBox.id.includes("popup-wrapper")) {
        addStyling(popupWrapper, {
            type: "classList",
            tokenListMethod: "toggle",
            value: "hide",
        });
        addStyling(popupWrapper, {
            type: "classList",
            tokenListMethod: "toggle",
            value: "show",
        });
    }
    const { nameText, emailText, messageText, info } = createMessage(
        _name,
        email,
        message
    );

    popupBox.append(info, nameText, emailText, messageText);
    exitPopupBtn.textContent = "Close";

    popupBox.append(exitPopupBtn);
    popupWrapper.append(popupBox);
});

exitPopupBtn.addEventListener("click", exitPopup);

function exitPopup() {
    popupWrapper.classList = "";
    popupBox.classList = "";
    popupBox.innerHTML = "";
    addStyling(popupWrapper, {
        type: "classList",
        tokenListMethod: "toggle",
        value: "hide",
    });
}