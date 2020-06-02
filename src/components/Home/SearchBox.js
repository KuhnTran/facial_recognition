import React from 'react';
import './SearchBox.css';
const SearchBox = (props) =>
{
    return(
        <div className='flex flex-column items-center ma2'>
            <p className='pa2 ma2 tc'>This website will detect how many faces you have in the picture</p>
            <div className='flex justify-center w-100'>
                <div className='flex justify-center shadow-2 br3 patternBackground setWidth'>
                    <input className='pa3 br3 ml3 mv3 w-60' placeholder='Enter a picture to search for faces' type='text' onChange={props.onInputChange}/>   
                    <button className='pa3 mr3 mv3 grow white bg-navy br3 w-30' onClick={props.onSearchClick}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;