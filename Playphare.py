import string

def generate_key_square(key):
    key = key.upper().replace("J", "I")
    seen = set()
    key_square = []

    for char in key + string.ascii_uppercase:
        if char == "J":
            continue
        if char not in seen and char.isalpha():
            seen.add(char)
            key_square.append(char)

    return [key_square[i:i+5] for i in range(0, 25, 5)]


def prepare_text(text):
    text = text.upper().replace("J", "I")
    text = "".join(c for c in text if c.isalpha())

    prepared = ""
    i = 0
    while i < len(text):
        prepared += text[i]
        if i + 1 < len(text):
            if text[i] == text[i + 1]:
                prepared += "X"
            else:
                prepared += text[i + 1]
                i += 1
        else:
            prepared += "X"
        i += 1

    return prepared


def find_position(square, char):
    for r in range(5):
        for c in range(5):
            if square[r][c] == char:
                return r, c


def playfair_encrypt(plaintext, key):
    square = generate_key_square(key)
    text = prepare_text(plaintext)
    cipher = ""

    for i in range(0, len(text), 2):
        r1, c1 = find_position(square, text[i])
        r2, c2 = find_position(square, text[i + 1])

        if r1 == r2:
            cipher += square[r1][(c1 + 1) % 5]
            cipher += square[r2][(c2 + 1) % 5]
        elif c1 == c2:
            cipher += square[(r1 + 1) % 5][c1]
            cipher += square[(r2 + 1) % 5][c2]
        else:
            cipher += square[r1][c2]
            cipher += square[r2][c1]

    return cipher


def playfair_decrypt(ciphertext, key):
    square = generate_key_square(key)
    plain = ""

    for i in range(0, len(ciphertext), 2):
        r1, c1 = find_position(square, ciphertext[i])
        r2, c2 = find_position(square, ciphertext[i + 1])

        if r1 == r2:
            plain += square[r1][(c1 - 1) % 5]
            plain += square[r2][(c2 - 1) % 5]
        elif c1 == c2:
            plain += square[(r1 - 1) % 5][c1]
            plain += square[(r2 - 1) % 5][c2]
        else:
            plain += square[r1][c2]
            plain += square[r2][c1]

    return plain
