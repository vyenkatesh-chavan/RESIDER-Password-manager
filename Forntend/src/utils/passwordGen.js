const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%&*-_=+?";


// --------------------------------------------------
// Cryptographically secure random number
// --------------------------------------------------

const secureRandomInt = (max) => {
  if (max <= 0) {
    throw new Error("Invalid random range.");
  }

  const random = new Uint32Array(1);

  const MAX_UINT32 = 0x100000000;
  const limit = MAX_UINT32 - (MAX_UINT32 % max);

  let value;

  do {
    crypto.getRandomValues(random);
    value = random[0];
  } while (value >= limit);

  return value % max;
};


// --------------------------------------------------
// Random character
// --------------------------------------------------

const randomCharacter = (characters) => {
  return characters[secureRandomInt(characters.length)];
};


// --------------------------------------------------
// Secure Fisher-Yates shuffle
// --------------------------------------------------

const secureShuffle = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};


// --------------------------------------------------
// Check whether password contains obvious patterns
// --------------------------------------------------

const hasWeakPattern = (password) => {
  const lower = password.toLowerCase();

  // Repeated same character
  if (/(.)\1\1/.test(password)) {
    return true;
  }

  // Simple sequences
  const sequences = [
    "123",
    "234",
    "345",
    "456",
    "567",
    "678",
    "789",
    "abc",
    "bcd",
    "cde",
    "qwe",
    "wer",
    "ert",
    "rty",
    "tyu",
    "yui",
    "uio",
    "iop",
  ];

  for (const sequence of sequences) {
    if (lower.includes(sequence)) {
      return true;
    }
  }

  // Very obvious repeated patterns
  if (/^(.{1,2})\1+$/.test(password)) {
    return true;
  }

  return false;
};


// --------------------------------------------------
// Generate password
// --------------------------------------------------

export const generatePassword = (length, options) => {
  if (!Number.isInteger(length) || length < 8 || length > 10) {
    throw new Error("Password length must be between 8 and 10.");
  }

  const pools = [];

  if (options.uppercase) {
    pools.push(UPPERCASE);
  }

  if (options.lowercase) {
    pools.push(LOWERCASE);
  }

  if (options.numbers) {
    pools.push(NUMBERS);
  }

  if (options.symbols) {
    pools.push(SYMBOLS);
  }

  if (pools.length === 0) {
    throw new Error("At least one character type must be selected.");
  }

  const allCharacters = pools.join("");

  /*
    Generate until we get a password that:

    1. Has the requested length
    2. Contains every selected character type
    3. Does not contain obvious weak patterns
  */

  while (true) {
    const password = [];

    // Generate completely random characters
    for (let i = 0; i < length; i++) {
      password.push(randomCharacter(allCharacters));
    }

    const generatedPassword = password.join("");

    // Check selected character requirements
    const validUppercase =
      !options.uppercase || /[A-Z]/.test(generatedPassword);

    const validLowercase =
      !options.lowercase || /[a-z]/.test(generatedPassword);

    const validNumbers =
      !options.numbers || /[0-9]/.test(generatedPassword);

    const validSymbols =
      !options.symbols || /[!@#$%^&*()\-_=\+\[\]{}?]/.test(generatedPassword);

    if (
      validUppercase &&
      validLowercase &&
      validNumbers &&
      validSymbols &&
      !hasWeakPattern(generatedPassword)
    ) {
      return secureShuffle(password).join("");
    }
  }
};