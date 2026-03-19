import React, { useState } from 'react'

export default function Todo() {
  const [text,settext]=useState('')
  const [data,setdata]=useState([])
  const [editindex,seteditindex]=useState(null)

  function handlechange(e){
    settext(e.target.value)
  }

  function handlesubmit(e){
    e.preventDefault()

    if(editindex != null){
      const updatedList=[...data]
      updatedList[editindex]=text
      setdata(updatedList)
      seteditindex(null)
    }
    else{
      setdata([...data,text])
    }
    settext('')
  }

  function Delete(id){
    let ans=data.filter((el,i)=>{
      return i != id
    })
    setdata(ans)
  }

  function Edit(id){
    settext(data[id])
    seteditindex(id)
  }

  return (
    <div style={{textAlign:"center", marginTop:"40px"}}>

      <h2 style={{color:"blue"}}>Todo List</h2>

      <form onSubmit={handlesubmit} style={{marginBottom:"20px"}}>
        <input 
          type="text" 
          placeholder='enter name' 
          value={text} 
          onChange={handlechange}
          style={{padding:"10px", width:"200px", marginRight:"10px", border:"1px solid gray"}}
        />
        <input 
          type="submit" 
          value={editindex !== null ? "Update" : "Add"}
          style={{padding:"10px 15px", backgroundColor:"green", color:"white", border:"none", cursor:"pointer"}}
        />
      </form>

      <table 
        border="1" 
        style={{margin:"auto", borderCollapse:"collapse", width:"60%"}}
      >
        <thead style={{backgroundColor:"#333", color:"white"}}>
          <tr>
            <th style={{padding:"10px"}}>No</th>
            <th style={{padding:"10px"}}>Task</th>
            <th style={{padding:"10px"}}>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            data.map((el,i)=>{
              return (
                <tr key={i} style={{backgroundColor: i % 2 === 0 ? "#f2f2f2" : "white"}}>
                  
                  <td style={{padding:"10px"}}>{i+1}</td>
                  <td style={{padding:"10px"}}>{el}</td>

                  <td style={{padding:"10px"}}>
                    <button 
                      onClick={()=>Delete(i)}
                      style={{marginRight:"10px", padding:"5px 10px", backgroundColor:"red", color:"white", border:"none"}}
                    >
                      Delete
                    </button>

                    <button 
                      onClick={()=>Edit(i)}
                      style={{padding:"5px 10px", backgroundColor:"orange", color:"white", border:"none"}}
                    >
                      Edit
                    </button>
                  </td>

                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}