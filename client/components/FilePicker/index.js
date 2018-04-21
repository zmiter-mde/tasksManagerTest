import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import styles from './filePicker.scss';

class FilePicker extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            path: '',
            gotNewImage: false
        };
    }

    componentDidMount() {
        const { newImage } = this.props;
        this.setState({file: newImage.file, path: newImage.path});
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <button type="button"
                        onClick={this.openFilePicker.bind(this)}
                        className={classNames('btn btn-primary', styles.marginedLeft)}>
                    Pick a file
                </button>

                <span className={classNames(styles.marginedLeft, 'glyphicon', this.state.file ? 'glyphicon-ok' : '')}>
                </span>
                <span className={styles.marginedLeft}>{this.state.file ? 'File ready' : 'Pick a file please'}</span>
                <input id="image"
                       name="image"
                       type="file"
                       onChange={this.handleImageChange.bind(this)}
                       ref={instance => { this.filePicker = instance; }}
                       style={{display: 'none'}}
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

        reader.onloadend = () => {
            this.setState({
                file: file,
                path: reader.result,
                gotNewImage: false
            });
            this.props.handleImageChange(file, reader.result);
        };

        reader.readAsDataURL(file);
    }
}

const mapStateToProps = state => ({
    newImage: state.imageReducer.newImage
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePicker);