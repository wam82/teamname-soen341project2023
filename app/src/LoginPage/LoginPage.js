import React from 'react'

export default function LoginPage() {
  return (
    <div class="login-page-container">
      <div class="login-function-container">
        <h1 class="login-useless-text">Welcome to your<br/>professional community</h1>
        <input class="login-input-boxes" type="text" name="input" placeholder="Email or phone number"/>
        <input class="login-input-boxes"type="password" name="pass" placeholder="Password"/>
        <a href="#" class="forgot-password-anchor">Forgot password?</a>
        <input class="login-input-boxes main-sign-in-button" type="button" value="Sign in"/>
      </div>
      <div class="login-page-background">
      </div>
    </div>
  )
}
