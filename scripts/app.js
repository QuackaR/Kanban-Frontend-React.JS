var url = "http://localhost:8080/Kanban_Backend_RESTful_WebService_war_exploded/rest/json";

var Kanban = React.createClass({
    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        return (
            <div className="kanbanWebApp">
                <h1>Kanban-Board</h1>
                <KanbanBoard data={this.state.data} />
            </div>
        );
    }
});

var KanbanBoard = React.createClass({
    render: function() {
        return (
            <div className="kanbanBoard">
                <KanbanLane data={this.props.data} status="Backlog" />
                <KanbanLane data={this.props.data} status="ToDo" />
                <KanbanLane data={this.props.data} status="Progress" />
                <KanbanLane data={this.props.data} status="Waiting" />
                <KanbanLane data={this.props.data} status="Done" />
            </div>
        );
    }
});

var KanbanLane = React.createClass({
    render: function () {
        return (
            <div className="kanbanLane">
                <center><h2>{this.props.status}</h2></center>
                <KanbanTasks data={this.props.data} status={this.props.status} />
            </div>
        );
    }
});

var KanbanTasks = React.createClass({
    render: function() {
        var tasks = this.props.data.map(function(task) {
            if(task.status == this.props.status) {
                return (
                    <KanbanTask key={task.id} name={task.name} description={task.description} dueDate={task.dueDate} status={task.status} />
                );
            }
        }, this);
        return (
            <div>
                {tasks}
            </div>
        );
    }
});

var KanbanTask = React.createClass({
    render: function() {
        return (
            <div className="kanbanTask" class="kanbanTask">
                <div className="label">Name:</div>
                <div className="value">{this.props.name}</div>
                <div className="label">Description:</div>
                <div className="value">{this.props.description}</div>
                <div className="label">Due Date:</div>
                <div className="value">{this.props.dueDate}</div>
            </div>
        );
    }
});

ReactDOM.render(
    <Kanban url={url} />,
    document.getElementById('content')
);