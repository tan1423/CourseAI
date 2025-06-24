const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration:1 hours, NoOf Chapters:5, in JSON format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "CourseName": "Introduction to Python Programming",\n  "Description": "This course provides a basic introduction to Python programming.  It covers fundamental concepts, data types, and control structures.  Ideal for beginners with no prior programming experience.",\n  "Chapters": [\n    {\n      "ChapterName": "Setting up your Python Environment",\n      "About": "Learn how to install Python, choose a suitable IDE or text editor, and run your first Python program. We will cover different operating systems and popular development environments.",\n      "Duration": "15 minutes"\n    },\n    {\n      "ChapterName": "Basic Data Types and Variables",\n      "About": "Explore fundamental data types such as integers, floats, strings, and booleans.  Understand how to declare variables, assign values, and perform basic operations.",\n      "Duration": "20 minutes"\n    },\n    {\n      "ChapterName": "Control Flow: Conditional Statements",\n      "About": "Learn about conditional statements (if, elif, else) and how to use them to control the flow of execution in your programs. We will cover logical operators and comparison operators.",\n      "Duration": "20 minutes"\n    },\n    {\n      "ChapterName": "Loops and Iteration",\n      "About": "Understand for and while loops.  Learn how to iterate through sequences and repeat blocks of code efficiently.",\n      "Duration": "10 minutes"\n    },\n    {\n      "ChapterName": "Introduction to Functions",\n      "About": "Learn about defining and calling functions to organize and reuse code. We\'ll cover function parameters, return values, and scope.",\n      "Duration": "5 minutes"\n    }\n  ],\n  "Category": "Programming",\n  "Topic": "Python",\n  "Level": "Basic",\n  "TotalDuration": "1 hour" ,\n  "NoOfChapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Python Basic, Chapter: Variables and Data Types in JSON Format with list of array with field as title, explanation on give chapter in detail, CodeExample(Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Variables and Data Types in Python",\n  "explanation": "Variables are like containers that store data in Python. Data types define the kind of data a variable can hold. Understanding these concepts is fundamental to programming in Python.",\n  "chapter_details": {\n    "variables": {\n      "title": "Variables",\n      "explanation": "Variables are named locations in memory that store data. They allow you to work with data dynamically.",\n      "code_example": "<precode>name = \'Alice\'  # Assigning a string to the variable \'name\' \\nprint(name)  # Output: Alice\\n\\nage = 30  # Assigning an integer to the variable \'age\' \\nprint(age)  # Output: 30</precode>"\n    },\n    "data_types": {\n      "title": "Data Types",\n      "explanation": "Python has several built-in data types, each representing a different kind of data.",\n      "data_types_list": [\n        {\n          "type": "Integer (int)",\n          "description": "Whole numbers, e.g., 10, -5, 0",\n          "example": "<precode>age = 25  # Integer</precode>"\n        },\n        {\n          "type": "Float (float)",\n          "description": "Numbers with decimal points, e.g., 3.14, -2.5",\n          "example": "<precode>price = 19.99  # Float</precode>"\n        },\n        {\n          "type": "String (str)",\n          "description": "Sequences of characters enclosed in single or double quotes, e.g., \'hello\', \'Python\'",\n          "example": "<precode>message = \'Hello, world!\'  # String</precode>"\n        },\n        {\n          "type": "Boolean (bool)",\n          "description": "Represents truth values, either True or False",\n          "example": "<precode>is_active = True  # Boolean</precode>"\n        },\n        {\n          "type": "List",\n          "description": "Ordered collections of items, mutable (can be changed)",\n          "example": "<precode>colors = [\'red\', \'green\', \'blue\']  # List</precode>"\n        },\n        {\n          "type": "Tuple",\n          "description": "Ordered collections of items, immutable (cannot be changed)",\n          "example": "<precode>coordinates = (10, 20)  # Tuple</precode>"\n        },\n        {\n          "type": "Dictionary (dict)",\n          "description": "Unordered collections of key-value pairs",\n          "example": "<precode>person = {\'name\': \'John\', \'age\': 35}  # Dictionary</precode>"\n        },\n        {\n          "type": "Set",\n          "description": "Unordered collections of unique items",\n          "example": "<precode>unique_numbers = {1, 2, 3, 3, 4}  # Set (duplicates are removed)</precode>"\n        }\n      ]\n    },\n    "type_checking": {\n      "title": "Type Checking",\n      "explanation": "You can use the `type()` function to determine the data type of a variable.",\n      "code_example": "<precode>name = \'Alice\' \\nprint(type(name))  # Output: <class \'str\'>\\n\\nage = 25\\nprint(type(age))  # Output: <class \'int\'> </precode>"\n    },\n    "data_type_conversion": {\n      "title": "Data Type Conversion",\n      "explanation": "You can convert between data types using built-in functions like `int()`, `float()`, and `str()`. ",\n      "code_example": "<precode>number_str = \'10\'\\nnumber_int = int(number_str)  # Converts string to integer\\nprint(number_int)  # Output: 10</precode>"\n    }\n  }\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
