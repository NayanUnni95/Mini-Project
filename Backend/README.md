##### Run the python script

```bash

python app.py
```

##### Home Route (GET /home)

###### Request

```bash
curl http://127.0.0.1:5000/home
```

###### Response

```json
{
  "message": "Welcome to the Home Page!"
}
```

##### Home Route (POST /signup)

###### Request

```bash
curl -X POST http://127.0.0.1:5000/signup \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpass"}'
```

###### Response

```json
{
  "message": "User created successfully!",
  "user": {
    "username": "testuser",
    "password": "testpass"
  }
}
```

##### Home Route (POST /login)

###### Request

```bash
curl -X POST http://127.0.0.1:5000/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpass"}'
```

```json
{
  "message": "Login successful!",
  "user": {
    "username": "testuser",
    "password": "testpass"
  }
}
```

###### Response

```json
{
  "message": "Invalid username or password"
}
```
