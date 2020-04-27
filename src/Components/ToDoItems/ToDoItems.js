import React from 'react';

class ToDoItems extends React.Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
        this.createTasksReturn = this.createTasksReturn.bind(this);
    }
    createTasks(item) {
        return (
        <div className="row tasks">
        <i className="fa fa-check-circle fa-lg" onClick={() =>this.complete(item.key)}></i>
        <ul id="tasks" key={item.key}>{item.text}</ul>
        <i class="fa fa-trash-o fa-lg" onClick={() =>this.delete(item.key)}></i>
        </div>
        )}
    createTasksReturn(item) {
        return (
        <div className="row tasks">
        <i className="fa fa-repeat fa-lg" onClick={() =>this.complete(item.key)}></i>
        <del>
        <ul id="compTasks" key={item.key}>{item.text}</ul>
        </del>
        <i class="fa fa-trash-o fa-lg" onClick={() =>this.delete(item.key)}></i>
        </div>
         )}
        
    complete(key) {
        this.props.complete(key);
    }
    delete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
        var listItemsComp = todoEntries.map(this.createTasksReturn);
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