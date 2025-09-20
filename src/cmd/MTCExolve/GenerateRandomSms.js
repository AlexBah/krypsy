// GenerateRandomSms.js
function GenerateRandomSms(length) {
  const digits = [];
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    digits.push(randomDigit);
  }
  return digits.join(" ");
}

export default GenerateRandomSms;
