import React, {useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";



const Login = () => {
    const [userName, setuserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, seterrMsg] = useState('');
    const [sucess, setSucess] = useState(false);

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        setuserName('')
        setPwd('')
    
        Axios.post('http://localhost:3001/customer-login', {
            userName,
            pwd,
 
        }).then((result) => {
      
            if (result.data.length>0) {
                setSucess(true)
                console.log('login valide')
                history.push({
                    pathname: '/viewFood',
                    state: userName
                })
                
            }
            else{
                seterrMsg('Login Details Wrong !!')
            }
        }).catch((err) => seterrMsg('Login Details Wrong !!'))

    }




    return (
        <>

            <div className="containaer-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Login </h2>
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
                                <button className="btn btn-primary">Login</button>
                                {errMsg && <p className="text-center text-lg text-danger">
                                    {errMsg}
                                </p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Login;