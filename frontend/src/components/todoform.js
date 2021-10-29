import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        const defaultUser = props.users[0].pk
        this.state = {name: '', user: defaultUser}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.name, this.state.user, this.props.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="user">user</label>

                    <select name="user" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.pk}>{item.first_name + ' ' + item.last_name}</option>)}
                    </select>
                </div>
                <br/>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TodoForm
