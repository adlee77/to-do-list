import React from 'react';
import ToDoItems from "../ToDoItems/ToDoItems";
import moment from 'moment';
import './Incomplete.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isIncompleteClicked: true,
            items: [],
            completed_items: [],
            count: 0,
            count_completed: 0,
            message: false,
        };
        this.addItem = this.addItem.bind(this);
        this.completeItem = this.completeItem.bind(this)
        this.redoItem = this.redoItem.bind(this)
        this.deleteItemInc = this.deleteItemInc.bind(this)
        this.deleteItemComp = this.deleteItemComp.bind(this)
        this.switchTabs = this.switchTabs.bind(this)
        this.switchTabsTwo = this.switchTabsTwo.bind(this)
    }
    deleteItemInc(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        })
        this.setState({
            items: filteredItems,
        })
        this.state.count = this.state.items.length - 1
    }
    deleteItemComp(key) {
        var completedItems = this.state.completed_items.filter(function (item) {
            return (item.key !== key)
        })
        console.log(completedItems)
        this.setState({
            completed_items: completedItems,
        })
        this.state.count_completed = this.state.completed_items.length - 1
    }
    completeItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        })
        var completedItems = this.state.items.filter(function (item) {
            return (item.key === key)
        })
        this.setState((prevState) => {
            return{
            items: filteredItems,
            completed_items: prevState.completed_items.concat(completedItems),
            }
        })
        console.log(this.state.count_completed)
        this.state.count = this.state.items.length - 1
        this.state.count_completed = this.state.completed_items.length + 1
    }
    redoItem(key) {
        var filteredItems = this.state.completed_items.filter(function (item) {
            return (item.key === key)
        })
        var completedItems = this.state.completed_items.filter(function (item) {
            return (item.key !== key)
        })
        this.setState((prevState) => {
            return{
            items: prevState.items.concat(filteredItems),
            completed_items: completedItems,
            }
        })
        this.state.count = this.state.items.length + 1
        this.state.count_completed = this.state.completed_items.length - 1
    }
    switchTabs() {
        this.setState({
            isIncompleteClicked: true,
        });
    }
    switchTabsTwo() {
        this.setState({
            isIncompleteClicked: false,
        });
    }
    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };
            this.setState((prevState) => {
                this.setState({ message: '' })
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            this.setState({ message: false })
        }
        if (this._inputElement.value === "") {
            this.setState({ message: true })
            this.state.count--
        }
        this._inputElement.value = "";
        console.log(this.state.items)
        e.preventDefault();
        this.state.count++

    }
    render() {
        return (
            <div className="container">
                <header className="header">
                    <div className="row">
                        <div className="col-6">
                            <h3 id='date'>{moment().format('ddd, MMM Do')}</h3>
                        </div>
                        <div className="col-3">
                            <h3 onClick={this.switchTabs} 
                            className="hoverTask"
                            style={this.state.isIncompleteClicked ? {color: "white",} : {color:"#646971"}}>Incomplete Tasks</h3>
                        </div>
                        <div className="col-3">
                            <h3 onClick={this.switchTabsTwo}
                            className="hoverTask"
                            style={this.state.isIncompleteClicked ? {color: "#646971",} : {color:"white"}}>Completed Tasks</h3>
                        </div>
                    </div>
                </header>
                <div className="row">
                    <div className="col">
                        <p>{this.state.isIncompleteClicked ? `${this.state.count} Active Tasks` : `${this.state.count_completed} Completed Tasks`}</p>
                    </div>
                </div>
                <br></br>
                <form onSubmit={this.addItem}>
                <div className="row rowForm">
                        <div className="col-4">
                            <input ref={(a) => this._inputElement = a}
                                type="text"
                                className="form-control"
                                placeholder="Enter a task..."
                            />
                        </div>
                        <div className="col-2">
                            <div className="input-group-append">
                                <button className="btn" type="submit" id="button">Add Task</button>
                            </div>
                        </div>
                </div>
                </form>
                <div id="alert">{this.state.message ? 'Please enter in a task' : ''}</div>
                <br></br>
                <ToDoItems entries={this.state.isIncompleteClicked ? this.state.items : this.state.completed_items} page={this.state.isIncompleteClicked} complete={this.state.isIncompleteClicked ? this.completeItem : this.redoItem} delete={this.state.isIncompleteClicked ? this.deleteItemInc : this.deleteItemComp} id="entries" />
            </div>
        )
    }
}

export default SearchBar;