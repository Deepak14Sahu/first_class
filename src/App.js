import { Component } from 'react';
import './App.css';
import Form from './form.js'
import Table from './table';
import data from './data';

class App extends Component { 

  constructor(props) {

    super(props);

    this.state = {
      showForm : false,
      refresh : true,
      tableData : data,
      formInputData : {id: 0, name : '', age :'', email:'', city:'', mobile:''}
    }

    this.handleAgeClick = this.handleAgeClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancleClick = this.handleCancleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

  }

  // Sorting By Age

  handleAgeClick = (e) => {

    const newTableData = this.state.tableData.sort((a,b)=> a.age-b.age)

    if(e.target.innerHTML === '⇅' || e.target.innerHTML === '↑') { //Sort Ascendeing

      this.setState({tableData:newTableData});

      e.target.innerHTML ='&#8595'; // Downward Arrow

    }else{ // Sort Descending

      this.setState({tableData:newTableData.reverse()});

      e.target.innerHTML ='&#8593'; // Upward Arrow

    }

    this.setState({refresh:!this.state.refresh});
  }

  // Sorting By Name
  handleNameClick = (e) => {

    const newTableData = this.state.tableData.sort((a,b)=> {
      let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
      
      if (fa < fb) {return -1;}

      if (fa > fb) {return 1;}

      return 0;
    });

    if(e.target.innerHTML === 'A-Z') { 

      //Sort Ascendeing
      this.setState({tableData:newTableData});

      e.target.innerHTML ='Z-A';

    } else{ 
      // Sort Descending
      this.setState({tableData:newTableData.reverse()});

      e.target.innerHTML ='A-Z';

    }

    this.setState({refresh:!this.state.refresh});

  }

  handleChange =(e) => {
    const name= e.target.name;
    const value= e.target.value;

    this.setState({formInputData:{...this.state.formInputData,[name]:value}});

  }
  
  // form submit event
  handleSubmit =(e)=> {

    e.preventDefault();

    if(this.state.formInputData.id === 0) {

      let someProp = this.state.formInputData;
      someProp.id = this.state.tableData.length +1;

      this.setState({formInputData:someProp});

      const newData = [...this.state.tableData, this.state.formInputData];

      this.setState({tableData: newData});

    } else{
    
      const updateData = this.state.tableData.map((data) =>
      data.id === this.state.formInputData.id ? this.state.formInputData : data);

      this.setState({tableData:updateData});

    }

    const emptyData = {name : '', age :'', email:'', city:'', mobile:'', id:''};

    this.setState({formInputData:emptyData});

    this.setState({showForm : !this.state.showForm});

  }
  // handle cancle click button
  handleCancleClick = () => {

    this.setState({showForm : !this.state.showForm});

    const emptyData = {name : '', age :'', email:'', city:'', mobile:'', id:''};

    this.setState({formInputData:emptyData});

  }

  // handle add click button
  handleClick = () => {

    this.setState({showForm : true});

  }

  // handle edit button event
  handleEditClick = (e,data) =>{

    this.setState({showForm : !this.state.showForm});

    this.setState({formInputData:{...data}});

  }

  // handle delete button event
  handleDeleteClick = (e, id) => {
    const newData = this.state.tableData.filter((data) => data.id !== id);

    this.setState({tableData:newData});

  }

  render() {

    return(

      <div className='container'>

        {this.state.showForm && <Form handleChange={this.handleChange} 
                                      formInputData = {this.state.formInputData} 
                                      handleSubmit={this.handleSubmit} 
                                      handleCancleClick={this.handleCancleClick} /> 
        }

        {this.state.showForm && <div className="overlay"></div>}

        <Table tableData={this.state.tableData}
               handleAgeClick = {this.handleAgeClick}
               handleNameClick = {this.handleNameClick}
               handleEditClick={this.handleEditClick}
               handleDeleteClick={this.handleDeleteClick} />

        <button id='Add' onClick={this.handleClick}>Add</button>

      </div>

    )

  }

}

export default App;
