import cssutils
import re
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

def extract_color_styles(css_file_path):
    """
    Extract color and background-color styles from CSS file
    
    Args:
        css_file_path (str): Path to the CSS file
    
    Returns:
        dict: Dictionary of class color styles
    """
    # Initialize a dictionary to store class styles
    class_styles = {}

    try:
        # Parse the CSS file
        sheet = cssutils.parseFile(css_file_path)

        # Iterate through all CSS rules
        for rule in sheet:
            # Check if it's a style rule (CSS selector rule)
            if rule.type == rule.STYLE_RULE:
                # Extract selectors
                selectors = rule.selectorText
                
                # Focus only on class selectors
                if selectors.startswith('.'):
                    # Clean up selector (remove pseudo-classes, etc.)
                    clean_selector = re.split(r':|\s', selectors)[0]
                    
                    # Initialize style dictionary for this class
                    class_styles[clean_selector] = {}

                    # Iterate through style declarations
                    for property in rule.style:
                        # Only store color and background-color properties
                        if property.name in ['color', 'background-color', 'background']:
                            # Special handling for 'background' property
                            if property.name == 'background':
                                # Extract color if background is a color
                                color_match = re.search(r'(#[0-9a-fA-F]{3,6}|rgb\(.*?\)|rgba\(.*?\)|[a-zA-Z]+)', property.value)
                                if color_match:
                                    class_styles[clean_selector]['background-color'] = color_match.group(1)
                            else:
                                class_styles[clean_selector][property.name] = property.value

        return class_styles

    except Exception as e:
        logging.error(f"Error parsing CSS file: {e}")
        return {}

def save_color_styles_to_file(class_styles, output_file):
    """
    Save color styles to a text file
    
    Args:
        class_styles (dict): Dictionary of class styles
        output_file (str): Path to output file
    """
    try:
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Open file for writing
        with open(output_file, 'w', encoding='utf-8') as f:
            # Write header
            f.write("CSS Color Styles Extraction Report\n")
            f.write("=" * 40 + "\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

            # Track total classes and colored classes
            total_classes = 0
            colored_classes = 0

            # Sort classes alphabetically
            sorted_classes = sorted(class_styles.items())

            # Iterate through class styles
            for class_name, styles in sorted_classes:
                total_classes += 1
                
                # Check if any color style is present
                if styles:
                    colored_classes += 1
                    
                    # Write class name
                    f.write(f"Class: {class_name}\n")
                    f.write("-" * (len(class_name) + 7) + "\n")
                    
                    # Write color styles
                    for style_type, value in sorted(styles.items()):
                        f.write(f"  {style_type}: {value}\n")
                    
                    f.write("\n")

            # Write summary
            f.write("\n--- Summary ---\n")
            f.write(f"Total Classes: {total_classes}\n")
            f.write(f"Colored Classes: {colored_classes}\n")
            f.write(f"Percentage Colored: {colored_classes/total_classes*100:.2f}%\n")

        logging.info(f"Color styles saved to {output_file}")
        logging.info(f"Total Classes: {total_classes}")
        logging.info(f"Colored Classes: {colored_classes}")

    except IOError as e:
        logging.error(f"Error writing to file: {e}")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")

def main():
    # Configuration
    css_file_path = r'css-minified/all.min.css'  # Update with your CSS file path
    output_file = 'outputs/css_color_styles.txt'

    try:
        # Validate CSS file exists
        if not os.path.exists(css_file_path):
            logging.error(f"CSS file not found: {css_file_path}")
            return

        # Extract color styles
        color_styles = extract_color_styles(css_file_path)

        # Validate styles extracted
        if not color_styles:
            logging.warning("No color styles were extracted from the CSS file.")
            return

        # Save color styles to file
        save_color_styles_to_file(color_styles, output_file)

    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    main()