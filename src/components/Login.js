import React from "react";

const Login = () => {
    return (
        <div>
            <form>
                <div>
                    <label>Login</label>
                    <input type='text' placeholder='Enter Username'></input>

                    <label>Password</label>
                    <input type='password' placeholder='Enter Password'></input>

                    <button type='submit'>Login</button>
                </div>

                <span>Forgot <a href='#'>password?</a></span>
            </form>
        </div>
    )
}

export default Login