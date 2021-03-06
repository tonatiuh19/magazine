import React, {useEffect, useState} from 'react'
import { getPostsByType, insertVisitor } from '../../apiFunctions/apiFunctions';
import Loading from '../../resources/Loading/Loading';
import moment from 'moment';
import 'moment/locale/es';
import {decode_utf8, removeAccents} from '../../resources/Decode/Decode';
import { useHistory, Link } from "react-router-dom";
import { osName, browserVersion, browserName, mobileVendor, mobileModel, engineName, deviceType, deviceDetect } from "react-device-detect";
import MetaTags from 'react-meta-tags';
import HelpImage from '../../resources/images/Helping/helping.png';
import Idea from '../../resources/images/Helping/Idea2.jpg';
import Team from '../../resources/images/Helping/Team.jpg';
import Creativity from '../../resources/images/Helping/Creativity.jpg';

const AdsWithUs = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        
        insertVisitor("0.0", osName, browserVersion, browserName, mobileVendor, mobileModel, engineName, deviceType, deviceDetect).finally(() => setLoading(false));
    }, [])

    return (
        <div>
            {loading ? (
                <div id="outer" className="container">
                    <div id="inner" className="row">
                        <div className="col-12 text-center">
                            <Loading></Loading>
                        </div>   
                    </div>
                </div>
            ) 
            : (<>
                <MetaTags>
                    <meta property="og:url"                content={window.location.href} />
                    <meta property="og:type"               content="article" />
                    <meta property="og:title"              content="Anunciate con nosotros" />
                    <meta property="og:description"        content={"Beyond Storytelling"} />
                </MetaTags>
                <div className="col-sm-12 bg-dark p-5">
                    <div className="row  text-white text-center">
                        <div className="col-sm-12">
                            <img src={HelpImage} className="img-fluid" alt="De la mano, ayudando" />
                            <h1 className="fw-bolder">Mas alla del Storytelling</h1>
                        </div>
                        
                    </div>
                    
                    <div className="row text-white">
                        <div className="col-sm-12 fs-3">
                            <p>Comprender y adoptar la tecnolog??a se ha vuelto esencial para nuestra forma de vida: c??mo trabajamos, c??mo nos divertimos, c??mo compramos, c??mo aprendemos y, en ??ltima instancia, c??mo nos conectamos con otras personas y el mundo que nos rodea. AGUSTIRRI aporta experiencia y entusiasmo de renombre mundial a nuestro contenido galardonado sobre la cultura actual impulsada por la tecnolog??a, lo que nos convierte en una autoridad confiable en todo lo relacionado con la tecnolog??a.</p>
                        </div>
                    </div>
                </div> 
                <div className="container">
                    <div className="row p-1 justify-content-center mb-5 mt-3">                         
                        <div className="container">
                            <div className="row text-center mt-5 mb-3">
                                <img src={Idea} className="img-thumbnail w-75 mx-auto d-block" alt="De la mano, ayudando" />
                                <h2 className="fw-bolder mt-3">Cosas que podr??amos hacer juntos</h2>
                            </div>
                            <div className="row mt-5 mb-3">
                                <h4 className="">Nuestra amplia cartera de editores premium llega a los consumidores dondequiera que se encuentren en su camino de compra, desde el descubrimiento y el conocimiento, la consideraci??n y la intenci??n, hasta la compra y la publicaci??n.</h4>
                            </div>
                            <div className="row mt-5 mb-3">
                                <div className="col-sm mt-5 align-middle">
                                    <div className="card-group">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bolder">Integraci??n de contenido editorial</h5>
                                                <p className="card-text">alineado con nuestras voces, series y rese??as de expertos.</p>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bolder">Pruebas y optimizaci??n de contenido</h5>
                                                <p className="card-text">an??lisis humano + automatizaci??n de alta velocidad.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-group">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bolder">Distribuci??n del contenido</h5>
                                                <p className="card-text">entregando compradores calificados que est??n preparados y listos para comprar, publicidad donde tiene que ir.</p>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bolder">Estad??sticas de la audiencia y segmentaci??n profunda</h5>
                                                <p className="card-text">proporcionar informaci??n, personalizaci??n, optimizaci??n y an??lisis.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <img src={Creativity} className="img-thumbnail w-75 mx-auto d-block" alt="De la mano, ayudando" />
                                </div>
                                

                            </div>
                            <div className="row text-center mt-5 mb-3">
                                <h5 className="">??Trabajemos juntos! Ponte en contacto: <a href="mailto:mequieroanunciar@agustirri.com?Subject=Me%20quiero%20anunciar%20en%20Agustirri" className="btn btn-outline-dark btn-sm">mequieroanunciar@agustirri.com</a></h5>
                            </div>
                        </div>         
                    </div>
                </div>    
            </>)}
        </div>
    )
}

export default AdsWithUs