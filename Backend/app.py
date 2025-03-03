from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy user database (for demonstration purposes)
users = []


# Home route (GET)
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Home Page!"})


# Login route (POST)
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()  # Get JSON data from the request
    username = data.get("username")
    password = data.get("password")

    # Check if user exists (dummy check)
    user = next(
        (
            user
            for user in users
            if user["username"] == username and user["password"] == password
        ),
        None,
    )
    if user:
        return jsonify({"message": "Login successful!", "user": user})
    else:
        return jsonify({"message": "Invalid username or password"}), 401


# Signup route (POST)
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()  # Get JSON data from the request
    username = data.get("username")
    password = data.get("password")

    # Check if username already exists
    if any(user["username"] == username for user in users):
        return jsonify({"message": "Username already exists"}), 400

    # Add new user to the dummy database
    new_user = {"username": username, "password": password}
    users.append(new_user)
    return jsonify({"message": "User created successfully!", "user": new_user}), 201


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
