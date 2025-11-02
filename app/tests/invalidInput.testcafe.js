/* eslint-disable no-unused-expressions */
/* global fixture, test */

import { Selector, ClientFunction } from 'testcafe';

const getPath = ClientFunction(() => window.location.pathname);

fixture`Add Post invalid input`.page`http://localhost:3000/signin`;

test('empty submit shows validation errors', async t => {
  await t
    .typeText('#signin-form-email', 'test@test.com', { replace: true })
    .typeText('#signin-form-password', '111111', { replace: true })
    .click('#signin-form-submit input.btn.btn-primary');

  await t.expect(getPath()).eql('/home', { timeout: 15000 });

  await t.navigateTo('http://localhost:3000/add-post');
  await t.expect(Selector('#addpost-submit').exists).ok({ timeout: 8000 });

  await t.click(Selector('#addpost-submit').find('button, input[type="submit"]'));
  await t.wait(300);

  const invalidFields = Selector('.is-invalid');
  await t.expect(invalidFields.count).gte(3, { timeout: 8000 });
});
