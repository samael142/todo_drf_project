import React from "react";
import axios from "axios";
import './App.css';
import UsersList from "./components/users.js";
import ProjectsList from "./components/projects";
import MenuList from "./components/menu.js";
import Footer from "./components/footer";
import TodoList from "./components/todos";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h5 >Page `{location.pathname}` not found</h5>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'users': [],
            'todos': [],
        }
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <MenuList/>
                    <Switch>
                        <Route path='/' exact component={() => <UsersList users={this.state.users}/>}/>
                        <Route path='/projects' exact component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Redirect from='/users' to='/' />
                        <Route path='/project/:id' component={() => <TodoList todos={this.state.todos}/>} />
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
