const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const formMessage = document.querySelector("#form-message");
const togglePassword = document.querySelector("#toggle-password");
const helpDialog = document.querySelector("#help-dialog");
const recoveryEmail = document.querySelector("#recovery-email");
const recoveryMessage = document.querySelector("#recovery-message");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.removeAttribute("aria-invalid");
  passwordInput.removeAttribute("aria-invalid");
  formMessage.textContent = "";
  formMessage.classList.remove("error");
}

togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  togglePassword.setAttribute("aria-pressed", String(!showing));
  togglePassword.setAttribute("aria-label", showing ? "Hiện mật khẩu" : "Ẩn mật khẩu");
});

emailInput.addEventListener("input", () => {
  emailError.textContent = "";
  emailInput.removeAttribute("aria-invalid");
  formMessage.textContent = "";
});

passwordInput.addEventListener("input", () => {
  passwordError.textContent = "";
  passwordInput.removeAttribute("aria-invalid");
  formMessage.textContent = "";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  let valid = true;

  if (!isValidEmail(emailInput.value)) {
    emailError.textContent = "Vui lòng nhập địa chỉ email hợp lệ.";
    emailInput.setAttribute("aria-invalid", "true");
    valid = false;
  }

  if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = "Mật khẩu cần có ít nhất 6 ký tự.";
    passwordInput.setAttribute("aria-invalid", "true");
    valid = false;
  }

  if (!valid) {
    formMessage.textContent = "Vui lòng kiểm tra lại thông tin đăng nhập.";
    formMessage.classList.add("error");
    (emailInput.getAttribute("aria-invalid") ? emailInput : passwordInput).focus();
    return;
  }

  // Đây là giao diện demo phía client, chưa kết nối máy chủ xác thực.
  formMessage.textContent = "Thông tin hợp lệ! Đây là bản demo, chưa kết nối hệ thống đăng nhập.";
});

document.querySelector("#forgot-password").addEventListener("click", () => {
  recoveryEmail.value = emailInput.value.trim();
  recoveryMessage.textContent = "";
  recoveryMessage.classList.remove("error");
  if (typeof helpDialog.showModal === "function") helpDialog.showModal();
});

document.querySelector("#send-recovery").addEventListener("click", () => {
  recoveryMessage.classList.remove("error");
  if (!isValidEmail(recoveryEmail.value)) {
    recoveryMessage.textContent = "Vui lòng nhập email hợp lệ trước khi tiếp tục.";
    recoveryMessage.classList.add("error");
    recoveryEmail.focus();
    return;
  }
  recoveryMessage.textContent = "Email hợp lệ. Chức năng gửi email cần được kết nối với máy chủ.";
});

helpDialog.addEventListener("click", (event) => {
  if (event.target === helpDialog) helpDialog.close();
});
