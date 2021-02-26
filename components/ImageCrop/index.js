import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';


export default class ImageCrop extends PureComponent {
  state = {
    src: null,
    newSrc: null,
    crop: {
      unit: '%',
      width: 400,
      aspect: 9 / 9,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
   
   
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

 


  getCroppedImg(image, crop, fileName) {
    image.crossOrigin = 'Anonymous';
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    
    return new Promise((resolve, reject) => {
 
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
      //  window.URL.revokeObjectURL(this.fileUrl);
      //  this.fileUrl = window.URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  } 

  haldeCropClick = () => {   
    const {  croppedImageUrl } = this.state;
    this.setState({ newSrc: croppedImageUrl })
    this.props.handleCrop(croppedImageUrl);
    let reader = new FileReader();
    reader.readAsDataURL(croppedImageUrl); 
    reader.onloadend = () => {
        let base64data = reader.result;                
        this.props.handleCrop(base64data);
    }
  }

  render() {
    const { crop, croppedImageUrl, src, newSrc } = this.state;
    const {fileimg} = this.props;
    return (
      <>
      <div className="App">
        {/* <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div> */}
        {(this.props.cropedImg && !newSrc)? (
          <ReactCrop
            src={this.props.cropedImg}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
           
          />
        ): <div><img className='CropedImg' alt="example" src={fileimg} /></div>}
        
        {this.props.cropedImg && croppedImageUrl && !newSrc && ( <div className='CropImg' onClick = {() => this.haldeCropClick()} >Crop</div>) }
        {/* {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )} */}
      </div>
      
       </>
    );
  }
}




