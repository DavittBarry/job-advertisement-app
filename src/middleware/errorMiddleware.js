export function globalErrorMiddleware(error) {
  console.error("Global Error Handler:", error);

  // Checks if the error has a response and/or data property
  let message =
    error.response && error.response.data && error.response.data.error
      ? error.response.data.error
      : error.message;

  showError(message);
}

function showError(message) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "fixed inset-0 flex items-center justify-center z-50";

  const errorDiv = document.createElement("div");
  errorDiv.innerText = message;
  errorDiv.className =
    "bg-error-500 text-white p-4 rounded-lg shadow-lg max-w-xs mx-2";

  wrapperDiv.appendChild(errorDiv);

  document.body.appendChild(wrapperDiv);

  setTimeout(() => {
    wrapperDiv.remove();
  }, 3000);
}
