const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div><input id="username" type="text" name="Username" value={username} onChange={handleUsernameChange} /></div>
        <div><input id="password" type="password" name="Password" value={password} onChange={handlePasswordChange} /></div>
        <div><button id="login-button" type="submit">login</button></div>
      </form>
    </div>
  )
}

export default Login