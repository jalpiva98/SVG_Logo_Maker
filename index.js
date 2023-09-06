// GIVEN a command-line application that accepts user input
const {Circle, Square, Triangle } = require('../SVG_Logo_Maker/lib/shapes');
const inquirer = require('inquirer');
const SVG = require('../SVG_Logo_Maker/lib/svg')
const {writeFile} = require('fs/promises')

// WHEN I am prompted for text to define 3 characters, text color, shape, and shape color

 
function init() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'characters',
            message: 'Please Enter up to 3 characters',
            validate: function(input){
                if(input.length > 3){
                    return "Please do not enter more than 3 characters"
                } else {
                    return true;
                }
            },
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Please Enter a color name or hexidecimal number for your text',
        },
      
        {
            type: 'list',
            name: 'shape',
            message: 'What shape would you like?',
            choices: ["Circle", "Square", "Triangle"],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Please Enter a your desired color for the shape',
        },
   
    ]).then(({characters, textColor, shape, shapeColor})=>{
        let shapeType;
        switch (shape) {
            case 'circle':
                shapeType = new Circle()
                break;

            case 'square':
                shapeType = new Square()
                break;

            default:
            case 'triangle':
                shapeType = new Triangle()
                break;
        }
        shapeType.setColor(shapeColor);
        const svg = new SVG();
        svg.setTextColor(textColor, characters);
        svg.setShape(shapeType);
        return writeFile('logo.svg', svg.render())
    }).then(()=>{
        console.log('Generated logo.svg');
    }).catch((error)=>{
        console.log(error);
    })
}




init();

module.exports = {};