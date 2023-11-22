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
  wrapperDiv.className =
    "fixed top-0 left-0 right-0 flex items-start justify-center z-50 mt-1";

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
