def caesar_cipher_encrypt(message, shift):
    encrypted_message = ""

    for char in message:
        if char.isupper():
            encrypted_message += chr((ord(char) - ord('A') + shift) % 26 + ord('A'))
        elif char.islower():
            encrypted_message += chr((ord(char) - ord('a') + shift) % 26 + ord('a'))
        else:
            encrypted_message += char
    return encrypted_message
message = "Hello World"
shift = 3

encrypted = caesar_cipher_encrypt(message, shift)
print("Encrypted message:", encrypted)
