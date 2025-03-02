import secrets
import string

def generate(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    pswd = ''
    while not len(pswd) >= length:
        new_char = secrets.choice(characters)
        pswd += new_char
    return pswd

if __name__ == "__main__":
    print(generate())

