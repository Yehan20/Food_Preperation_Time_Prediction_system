import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";



const SignUp = () => {
    const [userName, setuserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errMsg, seterrMsg] = useState('');
    const [sucess, setSucess] = useState(true);

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        setuserName('')
        setPwd('')
        setConfirm('')
        if (pwd === confirm) {

            Axios.post('http://localhost:3001/customer-sign-in', {
                userName,
                pwd,

            }).then((result) => {
                console.log(result)
                if (result.data.status) {
                    setSucess(true)
                    console.log('login valide')
                    history.push({
                        pathname: '/login',

                    })

                }
                else{
                    setSucess(false)
                }
            }).catch(err => console.log(err))

        }
        else {
            seterrMsg('passowrd not matching')
        }

    }

    return (
        <>

            <div className="containaer-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Sign Up </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 w-100">
                                    <label className="form-label">User Name</label>
                                    <input required type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setuserName(e.target.value)}
                                        value={userName}
                                    />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label">Password</label>
                                    <input required type="password" className="form-control" id="exampleFormControlInput1" onChange={(e) => setPwd(e.target.value)}
                                        value={pwd} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label">Confirm Password</label>
                                    <input required type="password" className="form-control" id="exampleFormControlInput1" onChange={(e) => setConfirm(e.target.value)}
                                        value={confirm} />
                                </div>
                                <button className="btn btn-primary">Sign Up</button>
                                <p className="text-center text-danger">{errMsg}</p>
                                <div>
                                    {!sucess && <p className="text-center text-danger">User Name is Taken</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;