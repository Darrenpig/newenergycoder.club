import re

# Read file as binary to find corrupted lines
with open('src/lib/i18n/locales/zh.ts', 'rb') as f:
    lines = f.readlines()

# Find lines with odd number of single quotes
bad_lines = []
for i, line in enumerate(lines):
    # Skip comment lines
    if line.strip().startswith(b'//'):
        continue
    # Count single quotes
    quote_count = line.count(ord("'"))
    if quote_count % 2 == 1:
        bad_lines.append((i+1, line))

with open('bad_lines.txt', 'w', encoding='utf-8') as out:
    out.write(f'Found {len(bad_lines)} lines with odd number of quotes:\n')
    for line_num, line in bad_lines[:100]:
        try:
            decoded = line.decode('utf-8', errors='replace').rstrip()
        except:
            decoded = repr(line)
        out.write(f'Line {line_num}: {decoded}\n')

print(f'Found {len(bad_lines)} bad lines. See bad_lines.txt for details.')
