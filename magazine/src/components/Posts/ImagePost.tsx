import React, {useState} from 'react'

const ImagePost = (props:any) => {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [productImage, setProductImage] = useState('');
    const [errorImage, setErrorImage] = useState(true);
    const [errorImageText, setErrorImageText] = useState('Necesitas incluir una imagen');
    const [valid, setValid] = useState(true);

    const handleChangeImage = (e:any) => {
        if(validateImage(e.target.files[0])){
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setErrorImage(false);
                props.onChange(e);
              }else{
                setErrorImage(true);
              }
        }
        
    };

    const validateImage = (file:any) =>{
        let fileNameArr =  file.name.split(".");
        let filename = fileNameArr[fileNameArr.length-1];
        if (!(filename === "png" || filename === "jpg" || filename === "JPG" || filename === "PNG")) {
            setErrorImageText("Solo se soportan archivos png o jpg");
            return false;
        }
        if (file.size > 3195432) {
           setErrorImageText("Solo se soportan archivos menores a 3 MB");
           return false;
        }
        setErrorImage(false);
        return true;
    }

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
                accept="image/*"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChangeImage}
            />
            <br />
            {errorImage ? (<div className="alert alert-danger" role="alert">{errorImageText}</div>) : null}
        </div>
    )
}

export default ImagePost
