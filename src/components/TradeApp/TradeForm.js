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
  Divider,
  Input
} from 'semantic-ui-react';
import ProgressBar from '../ChatApp/Messages/ProgressBar';

class TradeForm extends React.Component {
  state = {
    user: this.props.currentUser,
    idol: '',
    group: '',
    comment: '',
    file: null,
    imageDownloadURL: null,
    authorized: ['image/jpeg', 'image/png'],
    uploadState: '',
    uploadTask: null,
    percentUploaded: 0,
    loading: false,
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
    // If there is an Image it gets uploaded and the upload function calls createTrade(withUrl) and addTrade(newTrade)
    if (this.state.file !== null) {
      if (this.isAuthorized(this.state.file.name)) { // check if the file is the correct file type
        const metadata = { contentType: mime.lookup(this.state.file.name) }; // attach meta data
        this.uploadFile(this.state.file, metadata); // sends file to firestore and adds trade to trades collection
      }
    //without an image a new trade is created and added to collection
    } else { 
      const newTrade = this.createTrade(); // returns an object that resembles how objects in trades collection look
      this.addTrade(newTrade);
    }
    // may need clean up function
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

  // returns an object that represents structure of a trades collection object
  createTrade = (fileUrl=null) => {
    const trade = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      details: {
        idol: this.state.idol,
        group: this.state.group,
        comment: this.state.comment
      },
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      }
    };
    // if there is an imageDownloadURL attach it to the trade object
    if (fileUrl !== null){
      trade['image'] = fileUrl;
    }
    return trade;
  }

  // adds the selected file to state
  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  // uploads file to storage and adds trade to trades collection
  uploadFile = (file, metadata) => {
    const filePath = `trades/images/${uuidv4()}.jpg`; // uuidv4 is a random number generator 
    
    // When set state is called and uploadTask is assigned, the file transfer starts and triggers 'state_changed' listener.
    this.setState({
      uploadState: 'uploading', //disables send button and enables progressBar component
      uploadTask: this.state.storageRef.child(filePath).put(file, metadata) // .put() uploads file to storage causing the code below to run.
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
              const newTrade = this.createTrade(downloadUrl); // returns an object that resembles how objects in trades collection look
              this.addTrade(newTrade); // upload trade object to trade collection
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

  // Sends trade object to firestore collection
  addTrade = (newTrade) => {
    const { user, tradesRef } = this.state;
    this.setState({ loading: true });
    if (newTrade) {
      tradesRef
        .child(user.uid)
        .push()
        .set(newTrade) // New trade gets added under trades/:useruid
        .then(() => {
          this.setState({  // reset trade associated data and loading status in state
            file: null,
            imageDownloadURL: null,
            idol: '',
            group: '',
            comment: '',
            loading: false,
            errors: [] 
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          })
        })
    } else { // if trade object isn't passed.
      this.setState({
        errors: this.state.errors.concat({ message: 'no trade to add' })
      })
    }
  }
  
  render() {
    const { idol, group, comment, errors, uploadState, percentUploaded, loading } = this.state;

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
                disabled={uploadState === 'uploading'}
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

              <Button disabled={loading} className={loading ? 'loading' : ''} color='violet' fluid size='large'>Post</Button>
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
