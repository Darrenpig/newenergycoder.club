with open('src/lib/i18n/locales/zh.ts', 'rb') as f:
    content = f.read()

# Find positions of line breaks
lines = content.split(b'\n')

# Get first 20 lines with their byte representations
with open('debug_bytes.txt', 'w') as out:
    for i in range(min(20, len(lines))):
        line = lines[i]
        out.write(f'Line {i+1} ({len(line)} bytes):\n')
        out.write(f'  Hex: {line.hex()}\n')
        # Count single quotes
        quote_count = line.count(ord("'"))
        out.write(f'  Single quote count: {quote_count}\n')
        if quote_count % 2 == 1:
            out.write(f'  *** WARNING: Odd number of quotes! ***\n')
        out.write('\n')
