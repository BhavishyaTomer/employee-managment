import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Update = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { id } = useParams();
    const navigate=useNavigate();
    const [age, setAge] = useState(0)
    const [error,setError]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const addUser = { name, email, age }
        console.log("value for body is", addUser)
        const response = await fetch(`http://localhost:4000/${id}`, {
            method: "PATCH",
            body: JSON.stringify(addUser),
            headers: {
                "Content-type": "application/json"
            }
        })
        const result = await response.json()
        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            console.log(result)
            navigate("/all")
        }
    }
   
    const fetchData=async ()=>{
        const url = `http://localhost:4000/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setEmail(result.email)
        setName(result.name)
        setAge(result.age)
    }
     useEffect(()=>{
        fetchData();
    },[])
  return (
    <div className='container my-2'>
         <h2 className='text-center'>Edit the data</h2>
     <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />  </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="Number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Update
