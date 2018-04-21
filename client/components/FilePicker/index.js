import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '../../utils/constants';

class FilePicker extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            path: undefined
        };
    }

    componentDidMount() {
        const { newImage } = this.props;
        // Otherwise file picker is reset on page reenter
        this.setState({file: newImage.file});
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <button type="button"
                        onClick={this.openFilePicker.bind(this)}
                        className="btn btn-primary margined-left">
                    Pick a file
                </button>

                <span className={classNames('glyphicon margined-left', {'glyphicon-ok': this.state.file})}>
                </span>
                <span className="margined-left">
                    {this.state.file ? 'File ready' : 'Pick a file please'}
                </span>
                <input id="image"
                       name="image"
                       type="file"
                       accept="image/jpg,image/png,image/gif"
                       onChange={this.handleImageChange.bind(this)}
                       ref={instance => { this.filePicker = instance; }}
                       className="hidden"
                       hidden />

            </div>
        );
    }

    openFilePicker() {
        this.filePicker.click();
    }

    handleImageChange(e) {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = this.handleImageLoad;

        reader.readAsDataURL(file);
    }

    handleImageLoad = (e) => {
        let img = new Image();
        img.onload = () => {
            let imageDataUrl = this.resizeImage(img);
            let resizedImage = this.imageDataUrlToImage(imageDataUrl);
            this.setState({file: resizedImage, path: imageDataUrl});
            this.props.handleImageChange(resizedImage, imageDataUrl);
        };
        img.src = e.target.result;
    };

    imageDataUrlToImage(imageDataUrl) {
        let blobBin = atob(imageDataUrl.split(',')[1]);
        let array = [];
        for(let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }

    resizeImage(image) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        let newSize = this.getNewSize(image);

        canvas.width = newSize.width;
        canvas.height = newSize.height;
        canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, newSize.width, newSize.height);

        return canvas.toDataURL("image/png");
    }

    getNewSize(image) {
        let width = image.width;
        let height = image.height;

        if (width > height) {
            if (width > MAX_IMAGE_WIDTH) {
                height *= MAX_IMAGE_WIDTH / width;
                width = MAX_IMAGE_WIDTH;
            }
        } else {
            if (height > MAX_IMAGE_HEIGHT) {
                width *= MAX_IMAGE_HEIGHT / height;
                height = MAX_IMAGE_HEIGHT;
            }
        }

        return {
            width: width,
            height: height
        };
    }
}

const mapStateToProps = state => ({
    newImage: state.imageReducer.newImage
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePicker);