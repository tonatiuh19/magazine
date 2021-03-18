import React, {useState} from 'react'

const ImagePost = (props:any) => {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [productImage, setProductImage] = useState('');
    const [errorImage, setErrorImage] = useState(true);
    const [errorImageText, setErrorImageText] = useState('Error');
    const [valid, setValid] = useState(true);

    const handleChangeImage = (e:any) => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
          setErrorImage(false);
        }
        props.onChange(e);
    };

    return (
        <div className="card text-center" style={{width: "28rem"}}>
            <label htmlFor="upload-button">
                {image.preview ? (
                    <img src={image.preview} width="300" height="300" />
                ) : 
                (
                    <>
                        <img className="card-img-top" src={productImage} />
                        <h5 className="btn btn-primary">Seleccionar nueva imagen</h5>
                        <p>Solo se permiten archivos jpg & png.</p>
                    </>
                )}
            </label>
            <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChangeImage}
            />
            <br />
            {errorImage ? (<div className="alert alert-danger" role="alert">Necesitas incluir una imagen</div>) : null}
        </div>
    )
}

export default ImagePost
