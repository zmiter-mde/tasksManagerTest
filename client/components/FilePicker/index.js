import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

class FilePicker extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            path: ''
        };
    }

    componentDidMount() {
        const { newImage } = this.props;
        // Otherwise file picker is reset on page reenter
        this.setState({file: newImage.file, path: newImage.path});
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
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                path: reader.result
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