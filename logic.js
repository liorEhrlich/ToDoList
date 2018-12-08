class ToDoTask extends React.Component {
    constructor(props) {
        super(props);
        this.markAsComplete = this.markAsComplete.bind(this)
        this.markAsDelete = this.markAsDelete.bind(this)
        this.markAsStarred = this.markAsStarred.bind(this)
    }
    markAsComplete() {
        this.props.onHandle(this.props.name, false,false)
    }
    markAsDelete() {
        this.props.onHandle(this.props.name, true,false)
    }
    markAsStarred(){
        this.props.onHandle(this.props.name, false, true)
    }
    render() {
        return (
            <div className="task">
                {this.props.name}
                <button onClick={this.markAsComplete}>&#10003;</button>
                <button onClick={this.markAsDelete}>&#x2717;</button>
                <button onClick={this.markAsStarred}>&#9733;</button>
            </div>
        );
    }
}


class CompletedTask extends React.Component {
    constructor(props) {
        super(props);
        this.markAsToDo = this.markAsToDo.bind(this)
        this.markAsDelete = this.markAsDelete.bind(this)
        this.markAsStarred = this.markAsStarred.bind(this)
    }
    markAsToDo() {
        this.props.onHandle(this.props.name, false,false)
    }
    markAsDelete() {
        this.props.onHandle(this.props.name, true,false)
    }
    markAsStarred(){
        this.props.onHandle(this.props.name, false, true)
    }
    render() {
        return (
            <div className="task">
                {this.props.name}
                <button onClick={this.markAsToDo}>&uarr;</button>
                <button onClick={this.markAsDelete}>&#x2717;</button>
                <button onClick={this.markAsStarred}>&#9733;</button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoTasks: [],
            completedTasks: []
        };
        this.createToDoTask = this.createToDoTask.bind(this)
        this.moveToCompleted = this.moveToCompleted.bind(this)
        this.moveToToDo = this.moveToToDo.bind(this)
    }
    createToDoTask(event) {
        if (event.keyCode === 13) {
            var arr = this.state.toDoTasks;
            arr.push(event.target.value)
            this.setState({
                toDoTasks: arr
            })
        }
    }
    moveToCompleted(name, isDelete,isStarred) {
        var arr = this.state.toDoTasks;
        var index = arr.indexOf(name)
        delete arr[index]
        this.setState({
            toDoTasks: arr
        })
        if (!isStarred && !isDelete) {
            var arr2 = this.state.completedTasks;
            arr2.push(name)
            this.setState({
                completedTasks: arr2
            })
        }
        else if(isStarred && !isDelete){
            var arr2 = this.state.toDoTasks;
            arr2.unshift(name)
            this.setState({
                toDoTasks: arr2
            })
        }

    }
    moveToToDo(name, isDelete,isStarred) {
        var arr = this.state.completedTasks;
        var index = arr.indexOf(name)
        if (index != -1) {
            delete arr[index]
            this.setState({
                completedTasks: arr
            })
        }
        if (!isStarred && !isDelete) {
            var arr2 = this.state.toDoTasks;
            arr2.push(name)
            this.setState({
                toDoTasks: arr2
            })
        }
        else if(isStarred && !isDelete){
            var arr2 = this.state.completedTasks;
            arr2.unshift(name)
            this.setState({
                completedTasks: arr2
            })
        }
    }
    render() {
        var toDoTasks = this.state.toDoTasks.map(
            x => <ToDoTask onHandle={this.moveToCompleted} key={Math.random() * 1000} name={x}></ToDoTask>
        );
        var completedTasks = this.state.completedTasks.map(
            x => <CompletedTask onHandle={this.moveToToDo} key={Math.random() * 1000} name={x}></CompletedTask>
        );
        return (
            <div className="main">
                <div className="logo"></div>
                <div className="topBarCls"></div>
                <h1>To Do List</h1>
                <input type="text" onKeyUp={this.createToDoTask} placeholder="New task"/>
                <h2>To Do Tasks</h2>
                {toDoTasks}
                <hr />
                <h2>Completed tasks</h2>
                {completedTasks}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);