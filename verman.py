def text_to_binary(text):
    """Convert text to a binary string"""
    return ''.join(format(ord(c), '08b') for c in text)

def binary_to_text(binary):
    """Convert binary string back to text"""
    chars = [binary[i:i+8] for i in range(0, len(binary), 8)]
    return ''.join(chr(int(c, 2)) for c in chars)

def vernam_encrypt_decrypt(plaintext, key):
    """Encrypt or decrypt using Vernam cipher (XOR)"""
    # Convert to binary
    p_bin = text_to_binary(plaintext)
    k_bin = text_to_binary(key)
    if len(k_bin) < len(p_bin):
        raise ValueError("Key must be at least as long as plaintext!")

    # XOR operation
    cipher_bin = ''.join(str(int(p_bit) ^ int(k_bit)) for p_bit, k_bit in zip(p_bin, k_bin))

    # Convert back to text
    return binary_to_text(cipher_bin)

# Example usage
plaintext = "HELLO"
key = "XMCKL"  # Key must be same length

ciphertext = vernam_encrypt_decrypt(plaintext, key)
print("Ciphertext:", ciphertext)

# Decryption (same function)
decrypted = vernam_encrypt_decrypt(ciphertext, key)
print("Decrypted:", decrypted)
