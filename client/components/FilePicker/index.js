import React, { Component } from 'react';

import classNames from 'classnames';

import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '../../utils/constants';

class FilePicker extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            path: undefined,
            typeAccepted: false
        };
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
        let newFile = e.target.files[0];
        this.setState({
            type: newFile.type,
            typeAccepted: this.isTypeAccepted(newFile.type)
        }, () => {
            const { typeAccepted, path, file } = this.state;
            if (!typeAccepted) {
                this.props.handleImageChange(file, path, typeAccepted);
            } else {
                let reader = new FileReader();

                reader.onloadend = this.handleImageLoad;

                reader.readAsDataURL(newFile);
            }
        });
    }

    isTypeAccepted(type) {
        return type === 'image/jpg' || type === 'image/jpeg' ||
               type === 'image/png' || type === 'image/gif';
    }

    handleImageLoad = (e) => {
        let img = new Image();
        img.onload = () => {
            let imageDataUrl = this.resizeImage(img);
            let resizedImage = this.imageDataUrlToImage(imageDataUrl);
            this.setState({file: resizedImage, path: imageDataUrl});
            this.props.handleImageChange(resizedImage, imageDataUrl, this.state.typeAccepted);
        };
        img.src = e.target.result;
    };

    imageDataUrlToImage(imageDataUrl) {
        let blobBin = atob(imageDataUrl.split(',')[1]);
        let array = [];
        for(let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: this.state.type});
    }

    resizeImage(image) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        let newSize = this.getNewSize(image);

        canvas.width = newSize.width;
        canvas.height = newSize.height;

        ctx.drawImage(image, 0, 0, newSize.width, newSize.height);

        let result = canvas.toDataURL(this.state.type);;
        canvas.remove();
        return result;
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

    setImage(image) {
        this.setState({file: image.file, path: image.path, typeAccepted: image.typeAccepted});
    }
}

export default FilePicker;