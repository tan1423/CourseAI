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
    topK: 64,
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
            {text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration:1 hours, NoOf Chapters:5, in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming Fundamentals\",\n    \"description\": \"This course provides a comprehensive introduction to Python programming. It covers the fundamental concepts of programming, including data types, variables, operators, control flow, functions, and modules. You will learn how to write Python code to solve real-world problems.\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter covers the basics of Python, including its history, syntax, and how to write your first Python program.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Data Types and Variables\",\n        \"about\": \"This chapter explores different data types in Python, such as integers, floats, strings, and Booleans. You will also learn how to declare and use variables.\",\n        \"duration\": \"25 minutes\"\n      },\n      {\n        \"name\": \"Operators and Expressions\",\n        \"about\": \"This chapter covers different types of operators in Python, including arithmetic, comparison, logical, and bitwise operators. You will learn how to use them to build expressions and evaluate their results.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Control Flow\",\n        \"about\": \"This chapter explains control flow structures in Python, such as conditional statements (if-else) and loops (for and while). You will learn how to control the execution flow of your programs based on certain conditions.\",\n        \"duration\": \"25 minutes\"\n      },\n      {\n        \"name\": \"Functions and Modules\",\n        \"about\": \"This chapter introduces you to functions, which are reusable blocks of code. You will learn how to define, call, and pass arguments to functions. You will also explore the concept of modules and how to import them into your programs.\",\n        \"duration\": \"20 minutes\"\n      }\n    ],\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n    \"duration\": \"1 hour\",\n    \"noOfChapters\": 5\n  }\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
