import React from 'react'


class ProjectFilterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {filter: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.filter(this.state.filter)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="filter" value={this.state.filter}
                           onChange={(event) => this.handleChange(event)}/>
                <input type="submit" className="btn btn-primary" value="Filter"/>
                </div>
            </form>
        );
    }
}

export default ProjectFilterForm
