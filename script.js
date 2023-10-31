document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("inputBox");
    const buttons = document.querySelectorAll("button");

    let currentInput = "0";

    function updateLocalStorage() {
        localStorage.setItem('calculatorData', currentInput);
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonValue = button.textContent;

            if (buttonValue === "=") {
                try {
                    currentInput = eval(currentInput);
                    inputBox.value = currentInput;
                } catch (error) {
                    inputBox.value = "Error";
                    currentInput = "0";
                }
            } else if (buttonValue === "AC") {
                currentInput = "0";
                inputBox.value = currentInput;
            } else if (buttonValue === "DEL") {
                currentInput = currentInput.slice(0, -1);
                if (currentInput === "") {
                    currentInput = "0";
                }
                inputBox.value = currentInput;
            } else if (buttonValue === "±") {
                if (currentInput !== "0") {
                    currentInput = -parseFloat(currentInput);
                    inputBox.value = currentInput;
                }
            } else if (buttonValue === "%") {
                if (currentInput !== "0") {
                    // Divide the current input by 100 to get the percentage value
                    currentInput = String(parseFloat(currentInput) / 100);
                    inputBox.value = currentInput;
                }
            } else {
                if (currentInput === "0") {
                    currentInput = buttonValue;
                } else {
                    currentInput += buttonValue;
                }
                inputBox.value = currentInput;
            }

            updateLocalStorage();
        });
    });

    const storedString = localStorage.getItem('calculatorData');
    if (storedString) {
        currentInput = storedString;
        inputBox.value = currentInput;
    }
});
