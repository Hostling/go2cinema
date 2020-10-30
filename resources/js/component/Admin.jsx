import React, {Component} from 'react';
import Login from "./admin/Login";
import AdminPage from "./admin/AdminPage";
import axios from "axios";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            errorMessage: null,
            mail: '',
            pwd: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }

    handleChangeMail(e) {
        this.setState({mail: e.target.value});
    }

    handleChangePass(e) {
        this.setState({pwd: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('email', this.state.mail);
        data.append('password', this.state.pwd);
        axios.post(`/api/login`, data)
            .then(response => response.status !== 200 ?
                this.setState({errorMessage: "Неверный логин или пароль"}) :
                this.doLogin(response.data.token))
            .catch(e => this.setState({errorMessage: "Неверный логин или пароль"}))
    }

    doLogin(token) {
        localStorage.setItem('token', token);
        this.setState({auth: true});
    }

    doLogout() {
        localStorage.clear();
        this.setState({auth: false});
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            axios.get('/api/check', {headers: {
                'Authorization': 'Bearer ' + token
                }})
                .then(response => response.status !== 200 ?
                this.doLogout() :
                this.setState({auth: true}))
                .catch(e => this.doLogout())
        } else {
            this.doLogout();
        }
    }

    render() {
        return (
            <>
            { this.state.auth ? <AdminPage /> : <Login
                auth={this.state.auth}
                handleSubmit={this.handleSubmit}
                handleChangeMail={this.handleChangeMail}
                handleChangePass={this.handleChangePass}
                errorMessage={this.state.errorMessage}
                mail={this.state.mail}
                pwd={this.state.pwd}
            /> }
            </>
        );
    }
}

export default Admin;
