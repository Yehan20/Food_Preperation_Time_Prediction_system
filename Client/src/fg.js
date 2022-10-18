import React, { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios'

function App() {

   const [movieName,setMovieName]=useState('')
   const [movieReview,setMovieReview]=useState('')
   const [updatedName,setUpdatedName]=useState('')
   const [moviews,setMovies]=useState([]);
   const [added,setAdded]=useState(false)
   const [ok,setOk]=useState(undefined)

   useEffect(()=>{
      getMovie();
      console.log("use effect called")
      

      return ()=>setAdded(false)
   },[added])

   const getMovie=()=>{
      Axios.get('http://localhost:3001/api/get').then((result)=>{
         console.log(result.data)
         setMovies(result.data)
         setMovieName('')
         setMovieReview('')
         setUpdatedName('')
      }).catch(err=>console.log(err))
   }

   const submitReview=()=>{
      console.log('worked');
      Axios.post('http://localhost:3001/api/insert',{
         movieName:movieName,
         movieReview:movieReview
      }).then((result)=>{
         if(result.statusText==="OK"){
        alert('inserted')
         // setMovieName('')
         // setMovieReview('')
         document.querySelector('input').value=''
         setAdded(true)
         }
      })
   }

   const deleteMovie=(id)=>{
       console.log(id);
       Axios.delete(`http://localhost:3001/api/delete/${id}`).then((result)=>{
         console.log(result)
         // if(resu)
         if(result.statusText="OK")
         setAdded(true)
 
       }).catch((error)=>{
         console.log("Error");
       })
               
      //  setAdded(true)
   }

   const updateMovie=(id,updatedName)=>{
   
     Axios.put('http://localhost:3001/api/update',{
      movieName:updatedName,
      id:id
     }).then((result)=>{
      if(result.statusText="OK"){
         // setMovieName('')
         document.querySelector('#update').value=''
         setAdded(true)
   
      }
     }).catch(error=>console.log(error))
   }
  
  return(
     <main>
        <h1>Crud Application</h1>
        <div className="form">
           <label htmlFor="">Moview Name</label>
          <input onChange={(e)=>setMovieName(e.target.value)} type="text" name='movieName' placeholder='Moview Name' />
          <label htmlFor="">Review</label>
          <input onChange={(e)=>setMovieReview(e.target.value)}  value={movieReview} type="text" name='movieReview' placeholder='Movie Review' />
          <button onClick={submitReview}>Submit</button>
        </div>

        <div className="movies">
          <h3>Movie list</h3>
          <ul>
            {
               moviews.map((item)=>{
                  const{movieName,review,id}=item;
                  return <li key={id}>
                     Movie name : {movieName} <br />
                     Movie Review :{review}
                     <div>
                        <button className='red' onClick={()=>deleteMovie(id)}> Delete</button>
                        <input type="text" id="update" placeholder='update'  name='updatedName' onChange={(e)=>setUpdatedName(e.target.value)} />
                        <button className='yellow' onClick={()=>updateMovie(id,updatedName)}> Update</button>
                     </div>
                  </li>
               })
            }
          </ul>
        </div>
     </main>
  )
}

export default App;
