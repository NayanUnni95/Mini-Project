from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
from Crypto.Random import get_random_bytes

def encrypt(plain_text: str):
    iv = get_random_bytes(16)
    cipher = AES.new(key=b'mysecretpassword', mode=AES.MODE_CBC, iv=iv)
    cipher_text = cipher.encrypt(pad(plain_text.encode(), AES.block_size))
    return iv+cipher_text

def decrypt(cipher_text : bytes):
    iv = cipher_text[:16]
    cipher_text_without_iv = cipher_text[16:]
    cipher = AES.new(key=b'mysecretpassword', mode=AES.MODE_CBC, iv=iv)
    plain_text = unpad(cipher.decrypt(cipher_text_without_iv),AES.block_size)
    return plain_text.decode()

if __name__ == '__main__':
    cipher = encrypt("Hello World!")
    print(f"{cipher}")
    plain = decrypt(cipher)
    print(f"{plain}")
