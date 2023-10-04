import { useState } from 'react';
import './App.css';
import Form from './form.js'
import Table from './table';
import { data } from './data';

function App() {
  const [showForm, setShowForm] = useState(false)
  const [hidden, setHidden] = useState('overlay hidden')
  const [tableData, setTableData]= useState(data)
  const [refresh, setRefresh] = useState(true)
  const [formInputData, setFormInputData] = useState(
    {
      id: '',
      name : '',
      age :'',
      email:'',
      city:'',
      mobile:''
    }
  )


// Sorting By Age
  const handleAgeClick = (e) =>{

    const newTableData = tableData.sort((a,b)=> a.age-b.age)

    if(e.target.innerHTML === '⇅' || e.target.innerHTML === '↑'){ //Sort Ascendeing
      setTableData(newTableData)
      e.target.innerHTML ='&#8595' // Downward Arrow
    }
    else{ // Sort Descending
      setTableData(newTableData.reverse())
      e.target.innerHTML ='&#8593' // Upward Arrow
    }

    setRefresh(!refresh)
    }

    // Sorting By Name
    const handleNameClick = (e) =>{

      const newTableData = tableData.sort((a,b)=> {
        let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
        
        if (fa < fb) {return -1;}
        if (fa > fb) {return 1;}
        return 0;})

      if(e.target.innerHTML === 'A-Z'){ 
        //Sort Ascendeing
        setTableData(newTableData)
        e.target.innerHTML ='Z-A'
      }
      else{ 
        // Sort Descending
        setTableData(newTableData.reverse())
        e.target.innerHTML ='A-Z' 
  
      }
      setRefresh(!refresh)
      }

  const handleChange=(e) =>{
    const newInput= (data)=>({...data,
    [e.target.name]: e.target.value})
    setFormInputData(newInput)
    }

  // form submit event
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formInputData.id=== ''){
      let dataLength = tableData.length
      formInputData.id = (tableData[dataLength-1].id)+1;
  
      const newData = (data) =>([...data,formInputData])
      setTableData(newData)

    }else{
      const updateData = tableData.map((data) =>
      data.id === formInputData.id ? formInputData : data)
      setTableData(updateData)
    }

    const emptyData = {name : '', age :'', email:'', city:'', mobile:'', id:''}
    setFormInputData(emptyData)
    setHidden('overlay hidden')
    setShowForm(false)

  }
  // handle cancle click button
  const handleCancleClick = () =>{
    setHidden('overlay hidden')
    setShowForm(false)
    const emptyData = {name : '', age :'', email:'', city:'', mobile:'', id:''}
    setFormInputData(emptyData)
  }

  // handle add click button
  const handleClick = () =>{
      setShowForm(true)
      setHidden('overlay')
  }
  // handle edit button event
  const handleEditClick = (e,data) =>{
    setShowForm(true)
    setHidden('overlay')
    setFormInputData({...data})

  }

  // handle delete button event
  const handleDeleteClick = (e,id) =>{
    const newData = tableData.filter((data) => data.id !== id);
    setTableData(newData)    
  }




  return (
    <div className='container'>
        {showForm && <Form handleChange={handleChange} formInputData = {formInputData} handleSubmit={handleSubmit} handleCancleClick={handleCancleClick} /> }
          
        <div className={hidden}></div>
        <Table tableData={tableData} handleAgeClick = {handleAgeClick} handleNameClick = {handleNameClick} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
        <button id='Add' onClick={handleClick}>Add</button>
    </div>
    
  );
}



export default App;
