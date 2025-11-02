import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Posts } from '../../api/post/Post';

// Component for adding new posts to the database

const bridge = new SimpleSchema2Bridge(Posts.schema);

/* Renders the AddStuff page for adding a document. */
const AddPost = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, program, description, name, countryRegion } = data;
    const owner = Meteor.user().username;
    Posts.collection.insert(
      { title, program, description, name, owner, countryRegion },
      (error) => {
        if (error) {
          return;
        }
        swal('Success', 'Post added successfully!', 'success');
        formRef.reset();

      },
    );
  };

  let fRef = null;

  return (
    <Container id="addpost-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Post</h2></Col>
          <AutoForm showInlineError validate="onSubmit" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="addpost-title" name="title" placeholder="Enter title" showInlineError />
                <TextField id="addpost-name" name="name" placeholder="Enter name" showInlineError />
                <SelectField id="addpost-program" name="program" />
                <SelectField id="addpost-countryRegion" name="countryRegion" />
                <LongTextField id="addpost-description" name="description" placeholder="Enter description" showInlineError />
                <ErrorsField />
                <SubmitField id="addpost-submit" value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
