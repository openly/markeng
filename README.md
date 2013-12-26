# Markup Engineering

A tool to engineer forntend. Split the content to pages, components sub components. Then merge it together. 

## Installation

You can install markeng using npm 

    npm install -g markeng

## Usage

Markeng works with a specific directory structure. Create the following directory structure to start with.

    * css*
        ** global.css
        ** resert.css
    * js*
        ** some_global_lib.js
    * images
        ** some_image.jpg
    * fonts
        ** some_font.ttf
    * comp *
        ** component1
            *** index.html *
            *** css
                **** component1.css
            *** js
                **** component1.js
    * pages *
        ** page1
            *** index.html
            *** css
                **** page1.css
            *** js
                **** page1.js
    * markeng.json

