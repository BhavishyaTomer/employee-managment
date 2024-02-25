import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from "react-router-dom"


const Read = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const url = `http://localhost:4000`;
    const response = await fetch(url);
    const result = await response.json();
    setData(result);
    if (!response.ok) {
      console.error(result.error);
    } else {
      setData(result);
    }

  }
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE"
    })
    const result = await response
    if (response) {
      console.log("successfully deleted")
      getData();
    }
  }
  useEffect(() => {
    getData();
  }, [])
  console.log(data)
  return (
    <div className='container my-2'>
      <h2 className='text-center'>All Data</h2>
      <div className='row'>
        {data?.map((info) => (
          <div key={info._id} className='col-3'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{info.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{info.email}</h6>
                <p className="text-muted">{info.age}</p>
                <a href="#" className="card-link" onClick={() => handleDelete(info._id)}>
                  Delete
                </a>

                <Link to={`/${info._id}`} className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Read
