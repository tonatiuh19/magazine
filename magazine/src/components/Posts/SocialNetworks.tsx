import React, {useState} from 'react'

const SocialNetworks = (props:any) => {
    const [selected, setSelected] = useState(true);
    const [social, setSocial] = useState('');

    const socialProfile = (value:any) =>{
        props.onChange({
            id: props.type,
            value: value
        });
    }

    return (
        <div className="row mb-2 text-left">
            <div className="col-sm-4">
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" onChange={() => setSelected(false)}></input>
                    <label className="form-check-label text-muted">{props.value}</label>
                </div>
            </div>
            <div className="col-sm-8">
                <input type="text" className="form-control" onChange={(e) => socialProfile(e.target.value)} disabled={selected}></input>
            </div>
        </div>
    )
}

export default SocialNetworks
