import React from "react";
import axios from "axios";
import './App.css';
import UsersList from "./components/users.js";
import ProjectsList from "./components/projects";
import Footer from "./components/footer";
import TodoList from "./components/todos";
import LoginForm from "./components/auth";
import {Route, BrowserRouter, Switch, Redirect, Link} from "react-router-dom";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h5>Page `{location.pathname}` not found</h5>
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
            'token': '',
            'errorMessage': ''
        }
    }

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users', {'headers': headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects', {'headers': headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos', {'headers': headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    getUserNames(username) {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users', {'headers': headers, params:{'username': username}})
            .then(response => {
                const username = response.data.results
                localStorage.setItem('loggedUser', (username[0].first_name + " " + username[0].last_name))
            }).catch(error => console.log(error))
    }


    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                localStorage.setItem('token', response.data.token)
                this.setState({'token': response.data.token, 'errorMessage': ''}, this.loadData)
                this.getUserNames(username)
            })
            .catch(error => {
                this.setState({'errorMessage': 'Неверный логин или пароль'})
            })
    }

// Тут меняю состояние всего, т.к при логауте вся информация на странице видна, пока страницу не обновишь.
    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('loggedUser', '')
        this.setState({
            'projects': [],
            'users': [],
            'todos': [],
            'token': '',
        }, this.loadData)
    }

    isAuthenticated() {
        return !!this.state.token
    }

    getHeaders() {
        if (this.isAuthenticated()) {
            return {'Authorization': 'Token ' + this.state.token}
        }
        return {}
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        this.setState({'token': token}, this.loadData)
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <nav>
                        <ul className="nav btn-group">
                            <li className="nav-item">
                                <Link className="btn btn-outline-primary" to='/'>Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-primary" to='/projects'>Projects</Link>
                            </li>
                            <li className="nav-item">
                                {this.isAuthenticated() ?
                                    <button className="btn btn-outline-primary"
                                            onClick={() => this.logout()}>Logout</button>
                                    :
                                    < Link className="btn btn-outline-primary" to='/login'>Login</Link>
                                }
                            </li>
                            <li className="nav-item">
                                <span className="navbar-brand">{localStorage.getItem('loggedUser')}</span>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path='/' exact component={() => <UsersList users={this.state.users}/>}/>
                        <Route path='/projects' exact component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Redirect from='/users' to='/'/>
                        <Route path='/project/:id' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
                {this.state.errorMessage &&
                <h5 className="error"> {this.state.errorMessage} </h5>}
            </div>
        )
    }
}

export default App;
