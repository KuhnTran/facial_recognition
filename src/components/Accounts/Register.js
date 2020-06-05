import React, {useState} from 'react';

const Register = (props) =>
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    
    const onChangeName = (event) =>
    {
        setName(event.target.value);
    }

    const onChangeEmail = (event) =>
    {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) =>
    {
        setPassword(event.target.value);
    }

    const onChangeConfirm = (event) =>
    {
        setConfirm(event.target.value);
    }

    const onSubmit = () =>
    {
        if (password === confirm)
        {   
            fetch(props.backendAddress + 'register/',
                {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {'Content-Type' : 'application/JSON' },
                    body: JSON.stringify(
                        { 
                            name: name, 
                            email: email, 
                            password: password
                        }),
                })
                .then(response => response.json())
                .then(data=> {
                    if (data.status === 'success')
                    {
                        props.accountChange(data);
                        props.changeRoute('Home')
                    }
                    else console.log('registering failed');
                })
                .catch(err => console.log('ERROR: register failed: ' + err));
        }
        else console.log('Password mismatched');
    }

    return(
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-3 center">
    <main className="pa4 white">
        <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">New Account</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  
                    type='name' name="name"  id="name" onChange={onChangeName}/>
                </div>

                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  
                    type='email' name="email"  id="email" onChange={onChangeEmail}/>
                </div>

                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  
                    type='password' name="password"  id="password" onChange={onChangePassword}/>
                </div>

                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  
                    type='password' name="password"  id="password" onChange={onChangeConfirm}/>
                </div>
            </fieldset>
            <div className="">
                <button className="b ph3 pv2 ba b--white white bg-transparent grow pointer f6 dib"
                    onClick={onSubmit}>Register</button>
            </div>
        </div>
    </main>
    </article>
    );
}

export default Register;