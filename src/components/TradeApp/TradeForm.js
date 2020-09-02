import React from "react";
import firebase from '../../firebase';
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

class TradeForm extends React.Component {
  state = {
    idol: '',
    group: '',
    comment: '',
    image: null,
    modal: false,
    errors: [],
    uploadState: '',
    percentUploaded: 0,
    loading: false
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({
        errors: [],
        loading: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ idol, group, comment }) => idol || group && comment

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
      error.message.toLowerCase().includes(inputName)
      )
        ? "error"
        : ""
  }

  // Pass this to the file modal and customize it for images associated with trades.
  uploadFile = (file, metadata) => {
    // const pathToUpload = this.state.channel.id;
    // const ref = this.props.getMessagesRef();
    // const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    // this.setState({
    //   uploadState: 'uploading',
    //   uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
    // },
    //   () => {
    //     this.state.uploadTask.on(
    //       'state_changed', 
    //       snap => {
    //         const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
    //         this.setState({ percentUploaded }); 
    //     },
    //       err => {
    //         console.error(err);
    //         this.setState({
    //           errors: this.state.errors.concat(err),
    //           uploadState: 'error',
    //           uploadTask: null
    //         })
    //       },
    //       () => {
    //         this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
    //           this.sendFileMessage(downloadUrl, ref, pathToUpload);
    //         })
    //         .catch(err => {
    //           console.error(err);
    //           this.setState({
    //             errors: this.state.errors.concat(err),
    //             uploadState: 'error',
    //             uploadTask: null
    //           })
    //         })
    //       }
    //     )
    //   }
    // )
  };

  render() {
    const { idol, group, comment, errors, loading, uploadState, percentUploaded } = this.state;

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

              <Divider />

              <Button
                color="teal"
                // disabled={}
                // onClick={}
                content="Add Image"
                labelPosition="left"
                icon="cloud upload"
              />

              {/* <FileModal 
                modal={modal}
                closeModal={this.closeModal}
                uploadFile={this.uploadFile}
              />
              <ProgressBar 
                uploadState={uploadState} 
                percentUploaded={percentUploaded}
              /> */}
              
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
