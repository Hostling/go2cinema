import React, {useState} from 'react';

const Login = ({auth, handleSubmit, errorMessage, handleChangeMail, handleChangePass, mail, pwd}) => {
    return (
        <main>
            <section className="login">
                <header className="login__header">
                    <h2 className="login__title">Авторизация</h2>
                </header>
                <span>{errorMessage}</span>
                <div className="login__wrapper">
                    <form className="login__form" onSubmit={handleSubmit} method="get" acceptCharset="utf-8">
                        <label className="login__label" htmlFor="mail">
                            E-mail
                            <input
                                className="login__input"
                                type="mail"
                                placeholder="example@domain.xyz"
                                name="mail"
                                value={mail}
                                onChange={handleChangeMail}
                                required
                            />
                        </label>
                        <label className="login__label" htmlFor="pwd">
                            Пароль
                            <input
                                className="login__input"
                                type="password"
                                placeholder=""
                                name="pwd"
                                value={pwd}
                                onChange={handleChangePass}
                                required
                            />
                        </label>
                        <div className="text-center">
                            <input
                                value="Авторизоваться"
                                type="submit"
                                className="login__button"
                                onClick={handleSubmit}
                            />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;
