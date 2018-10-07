import React, { Component, Fragment } from 'react';

const axios = require('axios');

const URL = "http://localhost:5000/api/items";

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      myData: []
    }
  }

  componentDidMount() {
    this.readData()
    console.log(this.state.myData)
  }

  createData = () => {
    console.log("createData = POST")
    const message = prompt("Add a new item");

    axios.post(URL, {
      message: message
    })
    .then(() => {
      this.readData()
    })
    .catch(err => {
      console.log(err + "(Failed to create a new item!)")
    })
  }

  readData = () => {
    axios.get(URL)
    .then(res => {
      console.log(res)
      this.setState({
        myData: res.data
      })
    })
    .catch(error => {
      console.log(error + "(Failed to load API)")
    })
  }

  updateData = () => {
    console.log("updateData = PUT")
    const _id = prompt("Enter Item ID");
    let idURL = URL + "/:" + _id
    console.log(idURL)
    const message = prompt("Enter new Item message");

    axios.put(idURL, {
      _id: _id,
      message: message
    })
    .then(() => {
      this.readData()
    })
    .catch(error => {
      console.log(error + "(Failed to update Item)")
    })
  }

  deleteData = () => {
    console.log("deletaData = DELETE" )
    const _id = prompt("Enter Sak ID");
    let idURL = URL + "/" + _id
    console.log(idURL)

    axios.delete(idURL, {
      _id: _id
    })
    .then(() => {
      this.readData()
    })
    .catch(error => {
      console.log(error + "(Failed to delete Item)")
    })
  }

  render() {
    let itemList = this.state.myData.map((item) => {
      return (
        <div className="item-con" key={item._id}>
          <li>
            {item.message}
          </li>
          <li>
            {item.date}
          </li>
          <li>
            {item._id}
          </li>
          <br />
        </div>
      );
    });

    return (
      <Fragment>
        <div className="btn-con">
          <button className="btn"
                  onClick={this.createData}>
            Create
          </button>
          <button className="btn"
                  onClick={this.updateData}>
            Update
          </button>
          <button className="btn"
                  onClick={this.deleteData}>
            Delete
          </button>
        </div>
        <br />
        <div id="item-list">
          {itemList}
        </div>
      </Fragment>
    );
  }
}
