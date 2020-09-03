import React from "react";
import firebase from '../../firebase';
import mime from 'mime-types';
import uuidv4 from 'uuid/v4';
import { 
  Grid, 
  Form, 
  Segment, 
  Button, 
  Header, 
  Message, 
  Icon,
  TextArea, 
  Divider
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProgressBar from '../ChatApp/Messages/ProgressBar';

class TradeForm extends React.Component {
  state = {
    idol: '',
    group: '',
    comment: '',
    file: null,
    imageDownloadURL: '',
    authorized: ['image/jpeg', 'image/png'],
    uploadState: '',
    uploadTask: null,
    percentUploaded: 0,
    storageRef: firebase.storage().ref(),
    tradesRef: firebase.database().ref('trades'),
    errors: []
  };

  componentWillUnmount() {
    if (this.state.uploadTask !== null) {
      this.state.uploadTask.cancel();
      this.setState({ uploadTask: null });
    }
  }

  // change value in state based on value of form field
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    // If there is an Image, it gets uploaded to storage and the download url is set in state for use in a trade object.
    if (this.state.file !== null) {
      if (this.isAuthorized(file.name)) { // check if the file is the correct file type
        const metadata = { contentType: mime.lookup(file.name) }; // attach meta data
        this.uploadFile(file, metadata); // sends file to firestore and add imageURL to state
        this.clearFile();
      }
    
  };

  // check if form is filled out
  isFormValid = ({ idol, group, comment }) => idol || group && comment

  // checks if the file type is in the authorized array in state.
  isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

  // sets file state back to null
  clearFile = () => this.setState({ file: null });

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
      error.message.toLowerCase().includes(inputName)
      )
        ? "error"
        : ""
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  // createPost = () => {
  //   //takes state and returns object for sending to firestore
  // }

  // adds the selected file to state
  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  // uploads file to storage and set the image download url in state
  uploadFile = (file, metadata) => {
    const filePath = `trades/images/${uuidv4()}.jpg`;
  
    this.setState({
      uploadState: 'uploading', //disables send button and enables progressBar component
      uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
    },
      () => {
        this.state.uploadTask.on(
          'state_changed', 
          snap => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            this.setState({ percentUploaded }); 
        },
          err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
              console.log('the image url is ', downloadUrl);
              this.setState({
                imageDownloadURL: downloadUrl
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                uploadState: 'error',
                uploadTask: null
              })
            })
          }
        )
      }
    )
  };

  render() {
    const { idol, group, comment, errors, uploadState, percentUploaded } = this.state;

    return (
      <Grid className='app' textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='violet' textAlign='center'>
            <Icon name='add' color='violet'/>
            Add New Listing
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                name='idol'
                icon='heart outline'
                iconPosition='left'
                placeholder='Idol'
                onChange={this.handleChange}
                value={idol}
                className={this.handleInputError(errors,'idol')}
                type='text'
              />

              <Form.Input
                fluid
                name='group'
                icon='heart'
                iconPosition='left'
                placeholder='Group'
                onChange={this.handleChange}
                value={group}
                className={this.handleInputError(errors,'text')}
                type='text'
              />

              <TextArea 
                placeholder='Add a Note'
                name='comment'
                onChange={this.handleChange}
                value={comment}
                className={this.handleInputError(errors,'comment')}
                type='text' 
              />

              <Input
                onChange={this.addFile} // Add file function adds file to state
                fluid
                label="File types: jpg, png"
                name="file"
                type="file"
              />

              <Divider />

              <ProgressBar 
                uploadState={uploadState} 
                percentUploaded={percentUploaded}
              />

              <Button disabled={uploadState === 'uploading'} className={loading ? 'loading' : ''} color='violet' fluid size='large'>Post</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          {/* <Message>
            Looking for a specific card? try searching here. <Link to='/register'>Register</Link>
          </Message> */}
        </Grid.Column>
      </Grid>
    );
  };
};

export default TradeForm;
