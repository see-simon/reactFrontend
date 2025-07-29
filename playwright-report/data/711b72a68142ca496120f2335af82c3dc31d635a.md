# Page snapshot

```yaml
- heading "Login" [level=2]
- alert: Login failed
- text: Email address
- textbox "Email address": new1@example.com
- text: Password
- textbox "Password": WrongPassword
- button "Login"
- link "Don't have an account? Sign Up":
  - /url: /signup
```