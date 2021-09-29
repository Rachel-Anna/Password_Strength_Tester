const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();

function updateStrengthMeter() {
  let weaknesses = calculatePasswordStrength(passwordInput.value);
  let strength = 100;
  reasonsContainer.innerHTML = ""; //so the error message doesnt appear twice
  weaknesses.map((weakness) => {
    if (weaknesses == null) return;
    strength -= weakness.deduction;
    let messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.append(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(
    lengthWeakness(password),
    uppercaseWeakness(password),
    lowercaseWeakness(password),
    numberWeakness(password),
    specialCharactersWeakness(password),
    repeatCharactersWeakness(password)
  );
  return weaknesses;
}

function lengthWeakness(password) {
  let length = password.length;
  if (length < 5) {
    return {
      message: "Your password needs to be longer",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
}

function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
}

function characterTypeWeakness(password, regex, type) {
  let matches = password.match(regex) || [];
  console.log(matches);

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}}`,
      deduction: 20,
    };
  }

  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
}

function specialCharactersWeakness(password) {
  return characterTypeWeakness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
}

function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: "Your password has repeat characters",
      deduction: matches.length * 10,
    };
  }
}
