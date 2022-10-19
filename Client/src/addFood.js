import React, { useState } from 'react';
import Axios from 'axios'
import { useHistory,Link } from 'react-router-dom';

const AddFood = () => {

    const [foodName, setFoodName] = useState('')
    const [foodCategory, setCategory] = useState('')
    const [foodPrice, setFoodPrice] = useState('')
    const [foodDesc, setFoodDesc] = useState('')
    const [file, setFile] = useState();
    const [veg,setVeg]=useState('')
    const [fileName, setFileName] = useState("");

    const history= useHistory()


    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
 

    };


    const add = async (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("foodName", foodName);
        formData.append("foodCategory", foodCategory);
        formData.append("foodPrice", foodPrice);
        formData.append("foodDesc", foodDesc);
        formData.append("veg", veg);

        try {
            const res = await Axios.post('http://localhost:3001/meals/add',
                formData
            )

            if (res.statusText === "OK") {
                alert('inserted')
                history.push('/')
                // document.querySelector('input').value = ''
            }

        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <div className='section-2 container-fluid'>
            <div className='d-flex justify-content-center'>
                <Link to='/' className='btn btn-primary mx-3'>Back</Link>
                <Link to='/orders' className='btn btn-success'>Orders</Link>
            </div>

            <form onSubmit={(e)=>add(e)}>
                <div className="mb-3 w-100">
                    <label className="form-label">Food Name</label>
                    <input required type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setFoodName(e.target.value)} />
                </div>
                <div className="mb-3 w-100">
                    <label className="form-label">Food Category</label>
                    <select required className="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                        <option value="" hidden>Choose</option>
                        <option value="main">Main</option>
                        <option value="premire">Premier</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="dessert">Dessert</option>
                        <option value="bite">Bite</option>
                    </select>
                </div>

                <div className="mb-3 w-100">
                    <label className="form-label">Veg/Non Vegg</label>
                    <select required className="form-select" aria-label="Default select example" onChange={(e) => setVeg(e.target.value)}>
                       <option value="" hidden>Choose</option>
                        <option value="1">Veg</option>
                        <option value="0">Non-Veg</option>
                        
                    </select>
                </div>

                <div className="mb-3 w-100">
                    <label className="form-label">Food Price</label>
                    <input required type="number" className="form-control" id="exampleFormControlInput1" onChange={(e) => setFoodPrice(e.target.value)} />
                </div>
                <div className="mb-3 w-100">
                    <label className="form-label">Description</label>
                    <textarea required className="form-control" id="exampleFormControlInput1" onChange={(e) => setFoodDesc(e.target.value)} ></textarea>
                </div>


                <div className="mb-3 w-100">
                    <input required type="file" onChange={(e) => saveFile(e)} />
                </div>

                <div className='mb-3 w-100'>
                    <input required type="submit" className="btn btn-success text-white w-100" value="Submit" />
                </div>
            </form>



        </div>

    );
}

export default AddFood;