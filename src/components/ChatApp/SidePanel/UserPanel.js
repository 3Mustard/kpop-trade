import React from 'react';
import firebase from '../../../firebase';
import AvatarEditor from 'react-avatar-editor';
import { Button, Grid, Header, Icon, Dropdown, Image, Input, Modal } from 'semantic-ui-react';

class UserPanel extends React.Component {

    state = {
        blob: '',
        croppedImage: '',
        previewImage: '',
        uploadededCroppedImage: '',
        user: this.props.currentUser,
        modal: false,
        modal2: false,
        storageRef: firebase.storage().ref(),
        // alt way of getting a user
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref('users'),
        metadata: {
            contentType: 'image/jpeg'
        }
    }

    openModal = () => this.setState({ modal:true });
    closeModal = () => this.setState({ modal: false });
    openModal2 = () => this.setState({ modal2:true });
    closeModal2 = () => this.setState({ modal2: false });

    userDropDownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span onClick={this.openModal}>Change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

    navigationDropDownOptions = () => [
        {
            key: "chat",
            text: <span>Go to chat</span>
        },
        {
            key: "trade",
            text: <span>Browse/Post trades</span>
        }
    ];

    uploadCroppedImage = () => {
        const { storageRef, userRef, blob, metadata } = this.state;

        storageRef
            .child(`avatars/user/${userRef.uid}`)
            .put(blob, metadata)
            .then(snap => {
                snap.ref.getDownloadURL().then(downloadURL => {
                    this.setState({ uploadededCroppedImage: downloadURL }, () =>
                    this.changeAvatar())
                })
            })
    }

    changeAvatar = () => {
        this.state.userRef
            .updateProfile({
                photoURL: this.state.uploadededCroppedImage
            })
            .then(() => {
                console.log('photoURL updated');
                this.closeModal();
            })
            .catch(err => {
                console.error(err);
            })

        this.state.usersRef
            .child(this.state.user.uid)
            .update({ avatar: this.state.uploadededCroppedImage })
            .then(() => {
                console.log('User avatar updated');
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                this.setState({ previewImage: reader.result });
            });
        }
    }

    handleCropImage = () => {
        if (this.avatarEditor) {
          this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
              croppedImage: imageUrl,
              blob
            });
          });
        }
      }

    handleSignout = () => {
        firebase    
            .auth()
            .signOut()
            .then(() => console.log('signed out!'))
    }

    render() {
        const { user, modal, previewImage, croppedImage } = this.state;
        const { primaryColor } = this.props;

        return (
            <Grid style={{ background: primaryColor }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* APP header */}
                        <Header inverted floated="left" as="h2">
                            <Icon style={{ color: 'pink' }} name="heartbeat" />
                            <Header.Content>Kpop Trade</Header.Content>
                        </Header>
                        {/* Dropdown */}
                        <Header style={{ padding: '0.25em' }} as="h4" inverted>
                            <Dropdown trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                </span>} 
                                options={this.userDropDownOptions()} 
                            />
                            <Dropdown trigger={
                                <span>
                                    <Icon style={{ color: 'pink' }} name="heartbeat" />
                                </span>} 
                                options={this.navigationDropDownOptions()} 
                            />
                        </Header>
                    </Grid.Row>

                    {/* Change user avatar modal */}
                    <Modal basic open={modal} onClose={this.closeModal}>
                      <Modal.Header>Change Avatar</Modal.Header>
                      <Modal.Content>
                          <Input
                            onChange={this.handleChange}
                            fluid
                            type='file'
                            label='New Avatar'
                            name='previewImage'
                          />
                          <Grid centered stackable columns={2}>
                              <Grid.Row centered>
                                  <Grid.Column className='ui center aligned grid'>
                                      {previewImage && (
                                          <AvatarEditor
                                            ref={node => (this.avatarEditor = node)} 
                                            image={previewImage}
                                            width={120}
                                            height={120}
                                            border={50}
                                            scale={1.2}
                                          />
                                      )}
                                  </Grid.Column>
                                  <Grid.Column>
                                      {croppedImage && (
                                          <Image 
                                            style={{ margin: '3.5em auto' }}
                                            width={100}
                                            height={100}
                                            src={croppedImage}
                                          />
                                      )}
                                  </Grid.Column>
                              </Grid.Row>
                          </Grid>
                      </Modal.Content>
                      <Modal.Actions>
                          {croppedImage && (<Button color='green' inverted onClick={this.uploadCroppedImage}>
                              <Icon name='save' /> Change Avatar 
                          </Button>)}
                          <Button color='green' inverted onClick={this.handleCropImage}>
                              <Icon name='image' /> Preview
                          </Button>
                          <Button color='red' inverted onClick={this.closeModal}>
                              <Icon name='save' /> Cancel
                          </Button>
                      </Modal.Actions>
                    </Modal>
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel;
