import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
// import Icon from 'components/Icon';
import Spinner from 'components/Spinner';
import PropTypes from 'prop-types';

const ImageModal = ({
  openImageViewer,
  imageViewerVisibility,
  imageUrls,
  setImageViewerVisibility,
}) => {
  return (
    <Modal visible={imageViewerVisibility} transparent animationType="slide">
      {/* <Icon name="icon-cross" onPress={() => setImageViewerVisibility(false)} /> */}
      <ImageViewer
        imageUrls={imageUrls}
        enableSwipeDown
        onSwipeDown={() => setImageViewerVisibility(false)}
        loadingRender={() => <Spinner />}
      />
    </Modal>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  openImageViewer: PropTypes.func,
  imageViewerVisibility: PropTypes.bool,
  imageUrls: PropTypes.array,
  setImageViewerVisibility: PropTypes.func,
};
