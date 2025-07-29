# Page snapshot

```yaml
- heading "Login" [level=2]
- alert: Login failed
- text: Email address
- textbox "Email address": test@example.com
- text: Password
- textbox "Password": "123456"
- button "Login"
- link "Don't have an account? Sign Up":
  - /url: /signup
```