Feature('Login Page');

// Scenario('test successful login', async ({ I }) => {
//   I.amOnPage('/login');
//   I.fillField('Password', '123456as');
//   I.fillField('E-mail', 'imran@me.com');
//   I.click('Sign in');
//   I.acceptPopup(); 
// });

// Scenario('test unsuccessful login - wrong password', async ({ I }) => {
//   I.amOnPage('/login');
//   I.fillField('E-mail', 'imran@me.com');
//   I.fillField('Password', 'wrongpassword');
//   I.click('Sign in');
//   I.waitForText('Wrong password', 5);
// });

// Scenario('test unsuccessful login - non-existent email', async ({ I }) => {
//   I.amOnPage('/login');
//   I.fillField('E-mail', 'nonexistent@example.com');
//   I.fillField('Password', 'anyPassword');
//   I.click('Sign in');
//   I.see('There is no account on this email');
// });

// Scenario('test empty email and password', async ({ I }) => {
//   I.amOnPage('/login');
//   I.click('Sign in');
//   I.see('wrong Email');
// });

// Scenario('test invalid email format', async ({ I }) => {
//   I.amOnPage('/login');
//   I.fillField('E-mail', 'invalidemail');
//   I.fillField('Password', 'anyPassword');
//   I.click('Sign in');
//   I.see('wrong Email');
// });
