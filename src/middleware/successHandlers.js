function showSuccess(message) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "fixed inset-0 flex items-center justify-center z-50";

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

export const handleLogoutSuccess = () => {
  showSuccess("Logout successful");
};

export const handleLoginSuccess = (response) => {
  const successMessage = response.data.message || "Login successful";
  showSuccess(successMessage);
};

export const handleRegisterSuccess = (response) => {
  const successMessage = response.data.message || "Registration successful";
  showSuccess(successMessage);
};

export const handleJobSubmitSuccess = (response) => {
  const successMessage = response.data.message || "Job submitted successfully";
  showSuccess(successMessage);
};
