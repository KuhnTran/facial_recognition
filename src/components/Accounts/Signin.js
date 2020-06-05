import React, {useState} from 'react'

const Signin = (props) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (event) =>
    {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) =>
    {
        setPassword(event.target.value);
    }

    const onSubmitClick = () =>
    {
        props.changeRoute('LoadingUser');
        fetch('https://sheltered-depths-20030.herokuapp.com/signin/',
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({email: email, password: password})    
            })
            .then(response => response.json())
            .then(data => 
                {
                    if (data.status === 'success')
                    {
                        props.accountChange(data.user);
                        props.changeRoute('Home');
                    }
                    else
                    {
                        props.changeRoute('Signin');
                    } 
                })
            .catch(err=> console.log(err));
        
    }

    return(
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-3 center">
        <main className="pa4 white">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"
                            onChange={onEmailChange}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"
                            onChange={onPasswordChange}/>
                    </div>
                </fieldset>
                <div className="">
                    <button className="b ph3 pv2 ba b--white white bg-transparent grow pointer f6 dib"
                        onClick={()=>
                            onSubmitClick()
                            }>Enter</button>
                </div>
            </div>
        </main>
        </article>
    )
}

export default Signin;