export function showSuccess(message) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className =
    "fixed top-16 left-0 right-0 flex items-start justify-center z-50";

  const successDiv = document.createElement("div");
  successDiv.innerText = message;
  successDiv.className =
    "bg-brand-green-500 text-white p-4 rounded-lg shadow-lg max-w-xs mx-2";

  wrapperDiv.appendChild(successDiv);
  document.body.appendChild(wrapperDiv);

  setTimeout(() => {
    wrapperDiv.remove();
  }, 3000);
}

export function showConfirmation(message, confirmCallback, cancelCallback) {
  const overlayDiv = document.createElement("div");
  overlayDiv.className =
    "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center";

  const confirmationDiv = document.createElement("div");
  confirmationDiv.className = "bg-white p-6 rounded-lg shadow-lg mx-4";

  const messageDiv = document.createElement("div");
  messageDiv.innerText = message;
  messageDiv.className = "text-lg text-gray-800 mb-4";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "flex justify-center";

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "Confirm";
  confirmButton.className =
    "bg-brand-green-500 text-white hover:bg-brand-green-600 font-medium rounded px-4 py-2 mr-2";
  confirmButton.onclick = () => {
    confirmCallback();
    overlayDiv.remove();
  };

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.className =
    "bg-brand-blue-500 text-white hover:bg-brand-blue-600 font-medium rounded px-4 py-2";
  cancelButton.onclick = () => {
    cancelCallback();
    overlayDiv.remove();
  };

  buttonsDiv.appendChild(confirmButton);
  buttonsDiv.appendChild(cancelButton);
  confirmationDiv.appendChild(messageDiv);
  confirmationDiv.appendChild(buttonsDiv);
  overlayDiv.appendChild(confirmationDiv);

  document.body.appendChild(overlayDiv);
}

export const handleLogoutSuccess = () => {
  showSuccess("Logout successful");
};

export function handleLoginSuccess() {
  showSuccess("Logged in successfully!");
}

export const handleRegisterSuccess = (response) => {
  const successMessage = response.data.message || "Registration successful";
  showSuccess(successMessage);
};

export const handleJobSubmitSuccess = () => {
  showSuccess("Job submitted successfully");
};

export const handleJobUpdateSuccess = () => {
  showSuccess("Job updated successfully");
};
