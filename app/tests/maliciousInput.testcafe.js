/* eslint-disable no-unused-expressions */
/* global fixture, test */
import { Selector, ClientFunction } from 'testcafe';

const getPath = ClientFunction(() => window.location.pathname);

fixture`Add Post malicious input`.page`http://localhost:3000/signin`;

test('malicious input is rejected', async t => {
  await t
    .typeText('#signin-form-email', 'test@test.com', { replace: true })
    .typeText('#signin-form-password', '111111', { replace: true })
    .click('#signin-form-submit input.btn.btn-primary');

  await t.expect(getPath()).eql('/home', { timeout: 15000 });
  await t.navigateTo('http://localhost:3000/add-post');
  await t
    .typeText('#addpost-title', '<script>alert("xss")</script>')
    .typeText('#addpost-name', 'Attacker')
    .typeText('#addpost-description', '<script>alert("xss")</script>')
    .pressKey('tab')
    .click('#addpost-submit');
  await t.navigateTo('http://localhost:3000/list');
  const latestPost = await Selector('.col-md-10').innerText;
  await t.expect(latestPost).notContains('<script>', 'raw script should not appear');

  const longString = 'A'.repeat(2000);
  await t.navigateTo('http://localhost:3000/add-post');
  await t.expect(Selector('#addpost-submit').exists).ok({ timeout: 8000 });

  await t
    .selectText('#addpost-title')
    .pressKey('delete')
    .typeText('#addpost-title', longString)
    .selectText('#addpost-description')
    .pressKey('delete')
    .typeText('#addpost-description', 'short')
    .selectText('#addpost-name')
    .pressKey('delete')
    .pressKey('tab')
    .click('#addpost-submit');

  await t.expect(getPath()).eql('/add-post', { timeout: 2000 });

});
