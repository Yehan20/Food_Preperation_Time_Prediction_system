import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "./loader";



const SignUp = () => {
    const [userName, setuserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errMsg, seterrMsg] = useState('');
    const [sucess, setSucess] = useState(true);
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        seterrMsg('')
        if (pwd === confirm) {

            Axios.post('https://foodlab-services.onrender.com/customer-sign-in', {
                userName,
                pwd,

            }).then((result) => {
                console.log(result)
                if (result.data.status) {
                    setSucess(true)
                    setLoading(false)
                    console.log('login valide')
                    history.push({
                        pathname: '/login',

                    })

                }
                else {
                    setSucess(false)
                    setLoading(false)
                    setuserName('')
                    setPwd('')
                    setConfirm('')
                }
            }).catch(err => console.log(err))

        }
        else {
            setuserName('')
            setPwd('')
            setConfirm('')
            setTimeout(() => {
                setLoading(false)
                setSucess(true)
                seterrMsg('passowrd not matching')
            }, 2000)
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
                                {!loading && <button className="btn btn-primary">Sign Up</button>}
                                <p className="text-center text-danger">{errMsg}</p>
                                {loading && <Loader />}
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