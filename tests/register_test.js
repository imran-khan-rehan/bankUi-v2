Feature('Register Page');

// Scenario('test successful registration', async ({ I }) => {
//   I.amOnPage('/signup');
//   I.fillField('name', 'John Doe');
//   I.fillField('Email', 'john@example.com');
//   I.fillField('password', 'Password123');
//   I.fillField('confirmPassword', 'Password123');
//   I.click('Sign up');
//   I.acceptPopup(); // Accept the success alert
//   I.seeInCurrentUrl('/login'); // Check if redirected to the login page
// });

Scenario('test empty fields validation', async ({ I }) => {
  I.amOnPage('/signup');
  I.click('Sign up');
  I.see('Name cant be empty');
  I.see('Enter a valid email address');
  I.see('Password must be at least 8 characters long and must contain both letters and digits.');
  I.see('Password doesnt match');
});

Scenario('test invalid email format', async ({ I }) => {
  I.amOnPage('/signup');
  I.fillField('Email', 'invalidemail');
  I.fillField('password', 'Password123');
  I.fillField('confirmPassword', 'Password123');
  I.click('Sign up');
  I.see('Enter a valid email address');
});

Scenario('test password mismatch', async ({ I }) => {
  I.amOnPage('/signup');
  I.fillField('name', 'John Doe');
  I.fillField('Email', 'john@example.com');
  I.fillField('password', 'Password123');
  I.fillField('confirmPassword', 'Password456');
  I.click('Sign up');
  I.see('Password doesnt match');
});

Scenario('test password validation', async ({ I }) => {
  I.amOnPage('/signup');
  I.fillField('name', 'John Doe');
  I.fillField('Email', 'john@example.com');
  I.fillField('password', 'short');
  I.fillField('confirmPassword', 'short');
  I.click('Sign up');
  I.see('Password must be at least 8 characters long and must contain both letters and digits.');
});

Scenario('test existing user email', async ({ I }) => {
  I.amOnPage('/signup');
  I.fillField('name', 'John Doe');
  I.fillField('Email', 'john@example.com');
  I.fillField('password', 'Password123');
  I.fillField('confirmPassword', 'Password123');
  I.click('Sign up');
  I.see('User already exists');
});

Scenario('test empty name validation', async ({ I }) => {
  I.amOnPage('/signup');
  I.fillField('Email', 'john@example.com');
  I.fillField('password', 'Password123');
  I.fillField('confirmPassword', 'Password123');
  I.click('Sign up');
  I.see('Name cant be empty');
});
