import React from 'react';
import './faceBoxes.css'
const ImageResult = (props) =>
{
    var i = 0;
    return(
        <div className='flex justify-center'>
            <div className='absolute'>
                <img id='resultImg' src={props.imageLink} alt='' height='300' width='auto'/> 
                    {props.faceLocations.map((item)=>
                        {
                            i++;
                            return(<div className='faceBox' 
                                key={i}
                                style={{
                                    top: item.top,
                                    bottom: item.bottom,
                                    left: item.left,
                                    right: item.right,
                                }}></div>);
                        })}
           </div>
        </div>
    )
}

export default ImageResult;