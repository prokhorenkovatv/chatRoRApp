import React, { useState } from 'react';
import { GiftedChat, Bubble, MessageImage } from 'react-native-gifted-chat';
import { View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import ChatActions from 'components/ChatActions';
import ImageModal from 'components/ImageModal';
import ChatBubble from 'components/ChatBubble';
import ImagePicker from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { selectCurrentMessages } from 'state/messages';
import { hp, wp } from 'utils/ui';
import PropTypes from 'prop-types';

const ChatScreenView = ({ sendHandler, createUserAvatarUrl, id }) => {
  const messages = useSelector(state => selectCurrentMessages(state, id));
  const allMessages = messages.map(node => {
    const message = {
      _id: node.id,
      text: node.text,
      createdAt: new Date(Date.parse(node.created_at)),
      user: {
        _id: 0,
        name: 'user',
        avatar: createUserAvatarUrl(),
      },
      image: node.image ? node.image : '',
    };
    return message;
  });

  const [imageViewerVisibility, setImageViewerVisibility] = useState(false);
  const [imageUrls, setImageUrls] = useState(messages.filter(m => m.image));

  const openImageViewer = images => {
    setImageViewerVisibility(true);
    setImageUrls(images);
  };

  const renderMessageImage = props => {
    const images = [
      {
        url: props.currentMessage.image,
      },
      ...imageUrls,
    ];

    return (
      <TouchableOpacity
        onPress={() => props.imageProps.openImageViewer(images)}
      >
        <Image
          source={{ uri: props.currentMessage.image }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  const sendImageHandler = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.data };
        //temporary local
        setMessages(prevState =>
          GiftedChat.append(prevState, {
            _id: Math.round(Math.random() * 1000000),
            createdAt: Date.now(),
            user: {
              _id: 1,
              name: 'user',
              avatar: createUserAvatarUrl(),
            },
            image: 'data:image/jpeg;base64,' + response.data,
          }),
        );
      }
    });
  };

  const actionsHandler = () => <ChatActions onImageSend={sendImageHandler} />;

  return (
    <>
      <View style={styles.container}>
        <GiftedChat
          renderUsernameOnMessage
          renderMessageImage={renderMessageImage}
          imageProps={{ openImageViewer }}
          messages={allMessages}
          onSend={message => sendHandler(message[0])}
          user={{ _id: 1, name: 'user', avatar: createUserAvatarUrl() }}
          setUserAvatar
          renderActions={actionsHandler}
          renderBubble={props => <ChatBubble {...props} />}
        />
      </View>
      <ImageModal
        openImageViewer={openImageViewer}
        imageViewerVisibility={imageViewerVisibility}
        imageUrls={imageUrls}
        setImageViewerVisibility={setImageViewerVisibility}
      />
    </>
  );
};
export default ChatScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: wp(25),
    height: hp(20),
    margin: wp(1),
    resizeMode: 'cover',
  },
});

ChatScreenView.propTypes = {
  sendHandler: PropTypes.func.isRequired,
  createUserAvatarUrl: PropTypes.func.isRequired,
};
