import React, { useState } from 'react'
import { useEffect } from 'react';
import Styles from "./todo.module.css"
function Todos() {
    const [todos,settodos] = useState([]);
    const [newTodo,setNewTodo] = useState("");
    const [page0,setPage] = useState(1);
    const [limit,setLimit] = useState(5)
    const [totalCount,setTotalCount] = useState()
    useEffect(()=>{
        // fetch("https://m6g3bt.sse.codesandbox.io/todos")
        fetch(`http://localhost:8080/todos?_page=${page0}&_limit=${limit}`)
        .then((res)=>res.json())
        .then((d)=>{
            settodos(d);
            // setTotalCount(+(d.ResponceHeaders["X-Total-Count"]));
            
        })
    },[page0,limit]);

    const saveInfo = () =>{
        fetch("http://localhost:8080/todos",{
            method:"POST",
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify({
                value:newTodo,
                 isCompleted:false,
            })
        })
        .then((res)=>res.json())
        .then((d)=>{
            setNewTodo("")
            settodos([...todos,d])
        })
    }
    // console.log(totalCount);
  return (
    <div className={Styles.body0}>
        <h2 style={{color:"red"}}>TODO APP</h2>
        <div>
            <input style={{fontSize:"23px"}} type="text" value={newTodo} onChange ={({target})=>setNewTodo(target.value)}/>
            
            <button style={{width:"35px",height:"35px",backgroundColor:"green"}} onClick={saveInfo}>+</button>
            </div>
            <br />
            <div>
            <button disabled={page0<=1} onClick={()=>setPage(page0-1)}>{"<"}</button>
        <select onChange={(e)=>setLimit(Number(e.target.value))}>
        <option value={5} >5</option>
       <option value={10} >10</option>
       <option value={20} >20</option>
     </select>
     <button 
    disabled = {page0*limit>totalCount} 
     onClick={()=>setPage(page0+1)}>{">"}</button>
     </div>
        
        <h2>Todo pagination</h2>
        <ul>
      {todos.map((el)=>(
         <li style={{backgroundColor:"pink"}} key={el.id}> {el.value} </li>
      ))}
      </ul>
    </div>
  )
}

export default Todos
