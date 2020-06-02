import React from 'react'

const Ranking = (props) =>
{
    return(
        <div className='flex justify-center w-100 light-blue'>
            <p>Hello {props.currentUser.name}, you have {props.currentUser.count} entries</p>
        </div>
    )
}
export default Ranking;