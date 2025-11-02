/* eslint-env mocha */
/* global Meteor */

import { assert } from 'chai';
import { Posts } from '/imports/api/post/Post.js';

if (Meteor.isServer) {
  describe('Posts schema validation', function () {

    it('rejects XSS script input', function () {
      const badPost = {
        title: '<script>alert("x")</script>',
        description: 'This is a normal description text.',
        name: 'TestUser',
        owner: 'testUser',
        program: 'Manoa International Exchange (MIX)',
        countryRegion: 'Japan',
      };

      assert.throws(() => Posts.schema.validate(badPost));
    });

  });
}
