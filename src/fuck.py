import os
import re

def remove_font_size_from_css(file_path):
    # Regular expression to match font-size declarations
    font_size_pattern = re.compile(r'\s*font-size:\s*[^;]+;?')

    # Read the CSS file
    with open(file_path, 'r') as file:
        css_content = file.readlines()

    # Remove font-size declarations
    updated_css_content = []
    for line in css_content:
        # Remove font-size declarations
        updated_line = font_size_pattern.sub('', line)
        updated_css_content.append(updated_line)

    # Write the updated content back to the file
    with open(file_path, 'w') as file:
        file.writelines(updated_css_content)

def process_css_files_in_directory(directory):
    # Iterate through all files in the specified directory
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.css'):
                file_path = os.path.join(root, file)
                print(f'Removing font-size from: {file_path}')
                remove_font_size_from_css(file_path)

if __name__ == '__main__':
    # Specify the directory containing CSS files
    directory = input("Enter the directory path containing CSS files: ")
    process_css_files_in_directory(directory)
    print("Font size removal complete.")