const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function tests() {
  // create a new Chrome webdriver instance
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

  const waitTime = 3000;
  
  // Test 1: Login to a student account
  console.log('Starting Test 1');
  await driver.get('http://localhost:3000/login');
  console.log('T1!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  let emailField = await driver.findElement(By.name('email'));
  await emailField.sendKeys('a@email.com');
  console.log('T2!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  let passwordField = await driver.findElement(By.name('password'));
  await passwordField.sendKeys('a');
  console.log('T3!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  const submitButton = await driver.findElement(By.css('button[type="submit"]'));
  await submitButton.click();
  console.log('T4!');
  await driver.wait(until.urlIs('http://localhost:3000/'));
  console.log('T5!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  console.log('Test 1 passed!');

  // Test 2: Click on a job posting and apply (STUDENT)
  console.log('Starting Test 2');
  await driver.get('http://localhost:3000/jobs/2');
  console.log('T6!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  const applyButton = await driver.findElement(By.css('div.JobPageButtonsContainer > button.JobApplicationButtons:nth-child(1)'));
  await applyButton.click();
  console.log('T7!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  const cancelButton = await driver.findElement(By.xpath("//button[text()='Cancel Application']"));
  await cancelButton.click();
  console.log('T8!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  await driver.navigate().refresh();
  console.log('T9!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  const applyButton2 = await driver.findElement(By.css('div.JobPageButtonsContainer > button.JobApplicationButtons:nth-child(1)'));
  await applyButton2.click();
  console.log('T10!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  const homeButton2 = await driver.findElement(By.xpath("//button[text()='Home']"));
  await homeButton2.click();
  console.log('T11!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  await driver.wait(until.urlIs('http://localhost:3000/'));
  console.log('T12!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  console.log('Test 2 passed!');

  // Test 3: Logout, login with headhunter creds, view applicants, and recommend an applicant
  console.log('Starting Test 3');

  await driver.findElement(By.css('a[href="/login"] > button.signup')).click();
  console.log('T13!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  emailField = await driver.findElement(By.css('input[name="email"]'));
  await emailField.sendKeys('e@email.com');
  console.log('T14!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  passwordField = await driver.findElement(By.css('input[name="password"]'));
  await passwordField.sendKeys('e');
  console.log('T15!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  let loginButton = await driver.findElement(By.css('button.main-sign-in-button[type="submit"]'));
  await loginButton.click();
  console.log('T16!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  await driver.get('http://localhost:3000/');
  console.log('T17!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  let viewApplicantsButton = await driver.findElement(By.css('button.JobApplicationButtons a[href="/job-applicants-headhunter/2"]'));
  await viewApplicantsButton.click();
  console.log('T18!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  
  let amiraApplicant = await driver.findElement(By.xpath("//p[contains(text(),'amira')]"));
  await amiraApplicant.findElement(By.xpath('..//..//button[contains(text(), "Recommend")]')).click();
  console.log('T19!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  console.log('Test 3 passed!');


  // Test 4: Logout, login with employer creds, view applicants, and accept an applicant
  console.log('Starting Test 4');
  await driver.findElement(By.css('a[href="/login"] > button.signup')).click();
  console.log('T21!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  emailField = await driver.findElement(By.css('input[name="email"]'));
  await emailField.sendKeys('b@email.com');
  console.log('T22!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  passwordField = await driver.findElement(By.css('input[name="password"]'));
  await passwordField.sendKeys('b');
  console.log('T23!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  loginButton = await driver.findElement(By.css('button.main-sign-in-button[type="submit"]'));
  await loginButton.click();
  console.log('T24!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  await driver.get('http://localhost:3000/jobs/2');
  console.log('T25!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  viewApplicantsButton = await driver.findElement(By.css('div.EmployerJobButtonsContainer > button#ViewApplicantsButton'));
  await viewApplicantsButton.click();
  console.log('T26!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  amiraApplicant = await driver.findElement(By.xpath("//p[contains(text(),'amira')]"));
  await amiraApplicant.findElement(By.xpath('..//..//button[contains(text(), "Accept")]')).click();
  console.log('T27!');
  await new Promise(resolve => setTimeout(resolve, waitTime));
  console.log('Test 4 passed!');

  //Test 5: See if student was recommended by headhunter (continuation of test 4)
  console.log('Starting Test 5');
  try {
    await amiraApplicant.findElement(By.xpath('..//p[contains(text(), "Recommended By a Headhunter")]'));
    console.log('Test 5 passed!');
  } catch (error) {
    console.log('Test 5 failed!');
  }
  console.log('T28!');
  await new Promise(resolve => setTimeout(resolve, waitTime));

  console.log('All tests passed!');


  // Quit the WebDriver instance
  await driver.quit();
}

tests();
