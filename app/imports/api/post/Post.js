import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class PostsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PostsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: { type: String, optional: false, min: 1, max: 20, regEx: /^[^<>]+$/ },
      description: { type: String, optional: false, min: 2, max: 2000, regEx: /^[^<>]+$/ },
      owner: String,
      program: {
        type: String,
        allowedValues: ['Manoa International Exchange (MIX)', 'Study Abroad Center', 'National Student Exchange (NSE)'],
        defaultValue: 'Manoa International Exchange (MIX)',
      },
      isFlagged: {
        type: Boolean,
        defaultValue: false,
      },
      name: { type: String, optional: false, min: 1, max: 10, regEx: /^[^<>]+$/ },
      countryRegion: {
        type: String,
        // eslint-disable-next-line max-len
        allowedValues: ['Australia', 'Canada', 'China', 'Czech Republic', 'Denmark', 'Fiji', 'Finland', 'France', 'French Polynesia', 'Germany', 'Hong Kong', 'Indonesia', 'Italy', 'Japan', 'Korea', 'Malaysia', 'Morocco', 'Netherlands', 'New Zealand', 'Norway', 'Philippines', 'Singapore', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'United Kingdom', 'United States'],
        defaultValue: 'Australia',
      },
      likes: {
        type: Number,
        defaultValue: 0,
      },
      isLiked: {
        type: Boolean,
        defaultValue: false,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {PostsCollection}
 */
export const Posts = new PostsCollection();
