# Fonts Folder Usage

This project utilizes a dedicated 'fonts' folder to manage and organize custom font files.
The 'fonts' folder is typically located in the root directory or within the 'assets' directory
of the project, depending on the project's structure.

## Purpose

- To store and manage custom font files (e.g., .ttf, .otf, .woff, .woff2) used throughout the project.
- To ensure that font files are easily accessible and maintainable.

## Usage

1. Place all custom font files in the 'fonts' folder.
2. Reference the font files in your CSS or stylesheet files using the appropriate path.

   Example:

   ```css
   @font-face {
     font-family: "CustomFont";
     src: url("path/to/fonts/CustomFont.woff2") format("woff2"), url("path/to/fonts/CustomFont.woff")
         format("woff");
     font-weight: normal;
     font-style: normal;
   }
   ```

3.Apply the custom fonts to your HTML elements using CSS.
Example:

```css
body {
  font-family: "CustomFont", sans-serif;
}
```

## Benefits

- Improved organization and management of font files.
- Easier maintenance and updates to font files.
- Consistent font usage across the project.

## Note

Ensure that the font files are properly licensed for use in your project.
