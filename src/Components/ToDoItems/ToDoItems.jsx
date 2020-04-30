import React from 'react';

class ToDoItems extends React.Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
        this.createTasksReturn = this.createTasksReturn.bind(this);
    }
    createTasks(item) {
        return (
        <div className="tasks">
        <div className="row">
        <div className="col-1">
        <i className="fa fa-check-circle fa-lg" onClick={() =>this.complete(item.key)}></i>
        </div>
        <div className="col-9">
        <ul id="tasks" key={item.key}>{item.text}</ul>
        </div>
        <div className="col-2">
        <i class="fa fa-trash-o fa-lg" onClick={() =>this.delete(item.key)}></i>
        </div>
        </div>
        </div>
        )}
    createTasksReturn(item) {
        return (
        <div className="tasks">
        <div className="row">
        <div className="col-1">
        <i className="fa fa-repeat fa-lg" onClick={() =>this.complete(item.key)}></i>
        </div>
        <div className="col-9">
        <ul id="tasks" key={item.key}>{item.text}</ul>
        </div>
        <div className="col-2">
        <i class="fa fa-trash-o fa-lg" onClick={() =>this.delete(item.key)}></i>
        </div>
        </div>
        </div>
         )}
        
    complete(key) {
        this.props.complete(key);
    }
    delete(key) {
        this.props.delete(key);
    }

    render() {
        let todoEntries = this.props.entries;
        let listItems = todoEntries.map(this.createTasks);
        let listItemsComp = todoEntries.map(this.createTasksReturn);
        return (this.props.page ?
            <ul className="theList">
                {listItems}
            </ul> :
            <ul className="theList">
            {listItemsComp}
        </ul>
        );
    }
}
export default ToDoItems;