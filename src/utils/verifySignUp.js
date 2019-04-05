export default (verifySignUp = state => {
  const { name, email, phone, password, passwordConfirmation } = state;
  const nameTest = /^[A-z][A-z '-.,]{5,31}$/;
  const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneTest = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/;
  const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  const toFill = {};

  if (!nameTest.test(name)) toFill.name = true;
  if (!emailTest.test(email)) toFill.email = true;
  if (!phoneTest.test(phone)) toFill.phone = true;
  if (!passwordTest.test(password)) toFill.password = true;
  if (password !== passwordConfirmation) toFill.passwordConfirmation = true;

  if (
    toFill.email ||
    toFill.name ||
    toFill.password ||
    toFill.passwordConfirmation ||
    toFill.phone
  ) {
    return toFill;
  } else return true;
});
