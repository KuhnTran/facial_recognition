import React from 'react';

const NaviBar = (props) =>
{
    return(
        <div className='flex flex-row-reverse'>
        {
            (props.currentPage === 'Signin' || props.currentPage === 'Register') ?
                <div>
                    <button className="b ma3 ph3 pv2 ba b--white white bg-transparent grow pointer f6 dib" 
                        onClick={() => props.changeRoute('Signin')}>Sign In</button>
                    <button className="b ma3 ph3 pv2 ba b--white white bg-transparent grow pointer f6 dib"
                        onClick={() => props.changeRoute('Register')}>Register</button>
                </div>
                :
                <div>
                    <button className="b ma3 ph3 pv2 ba b--white white bg-transparent grow pointer f6 dib"
                        onClick={()=> {
                            props.accountChange({
                                id: '',
                                name: '',
                                email: '',
                                count: 0,
                                date: Date.parse('01 Jan 1970 00:00:00 GMT'),
                            });
                            props.changeRoute('Signin');
                            }}>Sign Out</button>
                </div>


        }
        </div>
    );
}

export default NaviBar;
