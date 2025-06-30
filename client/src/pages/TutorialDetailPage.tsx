import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import useProgress from "@/hooks/useProgress"
import { cn } from "@/lib/utils"
import '@/styles/markdown.css'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, ChevronRight, Clock, ExternalLink, FileCode, List, Play } from "lucide-react"
import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from "react-router-dom"

// Mock data for tutorial content
const tutorialData = {
  "javascript-variables": {
    title: "JavaScript Variables and Data Types",
    description: "Learn how variables work in JavaScript and understand the different data types available.",
    duration: "20 min",
    level: "Beginner",
    sections: [
      {
        title: "Introduction to Variables",
        content: `
# Introduction to Variables

Variables are containers for storing data values. In JavaScript, there are three ways to declare variables:

- \`var\`: The traditional way to declare variables (function scoped)
- \`let\`: Introduced in ES6 for block-scoped variables that can be reassigned
- \`const\`: Also introduced in ES6 for block-scoped variables that cannot be reassigned

## Declaring Variables

\`\`\`javascript
// Using var (older method, function scoped)
var name = "John";

// Using let (block scoped, can be reassigned)
let age = 25;
age = 26; // This is allowed

// Using const (block scoped, cannot be reassigned)
const PI = 3.14159;
// PI = 3.14; // This would cause an error
\`\`\`

Best practice is to use \`const\` by default, and only use \`let\` when you know the variable will need to be reassigned.
        `
      },
      {
        title: "Data Types in JavaScript",
        content: `
# Data Types in JavaScript

JavaScript has several built-in data types:

## Primitive Data Types

1. **String**: Used for text
   \`\`\`javascript
   let name = "John";
   let greeting = 'Hello';
   let template = \`Hello, \${name}!\`; // Template literals (ES6)
   \`\`\`

2. **Number**: Used for integers and floating-point numbers
   \`\`\`javascript
   let age = 25;
   let price = 19.99;
   \`\`\`

3. **Boolean**: true or false values
   \`\`\`javascript
   let isActive = true;
   let isComplete = false;
   \`\`\`

4. **Undefined**: A variable that has been declared but not assigned a value
   \`\`\`javascript
   let result;
   console.log(result); // undefined
   \`\`\`

5. **Null**: Represents the intentional absence of any object value
   \`\`\`javascript
   let user = null; // User doesn't exist yet
   \`\`\`

6. **Symbol**: Unique and immutable primitive values (ES6)
   \`\`\`javascript
   const id = Symbol('id');
   \`\`\`

7. **BigInt**: For integers larger than the Number type can handle (ES2020)
   \`\`\`javascript
   const bigNumber = 9007199254740991n;
   \`\`\`

## Reference Data Types

1. **Object**: Collection of related data
   \`\`\`javascript
   const person = {
     name: "John",
     age: 30,
     isStudent: false
   };
   \`\`\`

2. **Array**: Ordered collection of items
   \`\`\`javascript
   const colors = ["red", "green", "blue"];
   \`\`\`

3. **Function**: Reusable blocks of code
   \`\`\`javascript
   function greet(name) {
     return \`Hello, \${name}!\`;
   }
   \`\`\`

4. **Date**: Represents dates and times
   \`\`\`javascript
   const today = new Date();
   \`\`\`

## Type Checking

You can check the type of a variable using the \`typeof\` operator:

\`\`\`javascript
typeof "Hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" (this is a historical bug in JavaScript)
typeof {}; // "object"
typeof []; // "object" (arrays are objects in JavaScript)
typeof function(){}; // "function"
\`\`\`
        `
      },
      {
        title: "Variable Scope",
        content: `
# Variable Scope in JavaScript

Variable scope determines where in your code a variable is accessible.

## Global Scope

Variables declared outside of any function or block have global scope and can be accessed from anywhere in the code.

\`\`\`javascript
// Global variable
const globalVar = "I am global";

function testFunction() {
  console.log(globalVar); // Accessible here
}

console.log(globalVar); // Also accessible here
\`\`\`

## Function Scope

Variables declared with \`var\` inside a function are only accessible within that function.

\`\`\`javascript
function testFunction() {
  var functionVar = "I am function-scoped";
  console.log(functionVar); // Accessible here
}

// console.log(functionVar); // Error: functionVar is not defined
\`\`\`

## Block Scope

Variables declared with \`let\` and \`const\` inside a block (like if statements or loops) are only accessible within that block.

\`\`\`javascript
if (true) {
  let blockVar = "I am block-scoped";
  const alsoBlockScoped = "Me too";
  var notBlockScoped = "I leak outside the block";

  console.log(blockVar); // Accessible here
}

// console.log(blockVar); // Error: blockVar is not defined
// console.log(alsoBlockScoped); // Error: alsoBlockScoped is not defined
console.log(notBlockScoped); // This works! var ignores block scope
\`\`\`

## Lexical Scope

Inner functions have access to variables declared in their outer functions.

\`\`\`javascript
function outer() {
  const outerVar = "I'm from the outer function";

  function inner() {
    console.log(outerVar); // Accessible here
  }

  inner();
}

outer();
\`\`\`

Understanding scope is important for writing maintainable code and avoiding bugs related to variable visibility.
        `
      }
    ],
    quiz: [
      {
        question: "Which keyword is used to declare a constant variable in JavaScript?",
        options: ["var", "let", "const", "fixed"],
        answer: 2
      },
      {
        question: "What is the output of: typeof [1,2,3]?",
        options: ["array", "object", "list", "undefined"],
        answer: 1
      },
      {
        question: "Which variable declaration is block-scoped?",
        options: ["var", "let", "both var and let", "neither var nor let"],
        answer: 1
      }
    ],
    resources: [
      {
        title: "MDN Web Docs - JavaScript Variables",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variables"
      },
      {
        title: "JavaScript.info - Variables",
        url: "https://javascript.info/variables"
      }
    ],
    nextTutorial: "javascript-functions",
    prevTutorial: null
  },
  "javascript-functions": {
    title: "JavaScript Functions",
    description: "Learn how to create and use functions in JavaScript.",
    duration: "25 min",
    level: "Beginner",
    sections: [
      {
        title: "Introduction to Functions",
        content: `
# Introduction to Functions

Functions are reusable blocks of code designed to perform specific tasks. They help organize code, make it reusable, and reduce repetition.

## Function Declaration

The most common way to define a function:

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

// Call the function
greet("Alice"); // Returns: "Hello, Alice!"
\`\`\`

## Function Expression

Storing a function in a variable:

\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name + "!";
};

// Call the function
greet("Bob"); // Returns: "Hello, Bob!"
\`\`\`

## Arrow Functions (ES6)

A shorter syntax for writing functions:

\`\`\`javascript
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Even shorter for simple functions
const greetShort = name => "Hello, " + name + "!";

// Call the function
greetShort("Charlie"); // Returns: "Hello, Charlie!"
\`\`\`
        `
      }
    ],
    quiz: [
      {
        question: "Which of the following is an arrow function?",
        options: [
          "function(a, b) { return a + b; }",
          "const add = function(a, b) { return a + b; }",
          "const add = (a, b) => a + b;",
          "function add(a, b) => { return a + b; }"
        ],
        answer: 2
      }
    ],
    resources: [
      {
        title: "MDN Web Docs - Functions",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
      }
    ],
    nextTutorial: "javascript-arrays",
    prevTutorial: "javascript-variables"
  }
};

export default function TutorialDetailPage() {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const { user } = useAuth();
  const { updateProgress } = useProgress();

  const [tutorial, setTutorial] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    if (tutorialId && tutorialData[tutorialId as keyof typeof tutorialData]) {
      setTutorial(tutorialData[tutorialId as keyof typeof tutorialData]);
      setLoading(false);
      setQuizAnswers(new Array(tutorialData[tutorialId as keyof typeof tutorialData].quiz.length).fill(-1));
    } else {
      // Tutorial not found
      setLoading(false);
    }
  }, [tutorialId]);

  const handleQuizSubmit = () => {
    if (!tutorial) return;

    let score = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === tutorial.quiz[index].answer) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    // In a real app, this would update user progress in the database
    updateProgress?.({
      completed: true,
      progress: (score / tutorial.quiz.length) * 100
    });
  };

  const handleQuizAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  if (loading) {
    return <div className="container mx-auto p-6 flex justify-center">Loading tutorial...</div>;
  }

  if (!tutorial) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Tutorial Not Found</h1>
          <p className="text-muted-foreground mt-2">The tutorial you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link to="/tutorials">Browse Tutorials</Link>
          </Button>
        </div>
      </div>
    );
  }

  const renderQuiz = () => {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Knowledge Check</h2>
          {!quizSubmitted && (
            <Button onClick={handleQuizSubmit} disabled={quizAnswers.includes(-1)}>
              Submit Answers
            </Button>
          )}
        </div>

        {quizSubmitted && (
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Your Score</h3>
                  <p className="text-2xl font-bold">{quizScore} / {tutorial.quiz.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {quizScore === tutorial.quiz.length ? 'Perfect score!' : 'Review the incorrect answers below'}
                  </p>
                  <Badge variant={quizScore === tutorial.quiz.length ? "default" : "outline"} className="mt-2">
                    {Math.round((quizScore / tutorial.quiz.length) * 100)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {tutorial.quiz.map((quizItem: any, qIndex: number) => (
            <Card key={qIndex} className={cn({
              "border-green-500": quizSubmitted && quizAnswers[qIndex] === quizItem.answer,
              "border-red-500": quizSubmitted && quizAnswers[qIndex] !== quizItem.answer && quizAnswers[qIndex] !== -1
            })}>
              <CardHeader>
                <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {quizItem.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quizItem.options.map((option: string, oIndex: number) => (
                    <div
                      key={oIndex}
                      className={cn(
                        "flex items-center space-x-2 p-3 rounded-md cursor-pointer border transition-colors",
                        {
                          "bg-primary/5 border-primary": quizAnswers[qIndex] === oIndex && !quizSubmitted,
                          "bg-green-50 border-green-500 dark:bg-green-950/20": quizSubmitted && oIndex === quizItem.answer,
                          "bg-red-50 border-red-500 dark:bg-red-950/20": quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== quizItem.answer,
                          "hover:bg-accent": !quizSubmitted
                        }
                      )}
                      onClick={() => !quizSubmitted && handleQuizAnswerSelect(qIndex, oIndex)}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center",
                        {
                          "border-primary bg-primary text-primary-foreground": quizAnswers[qIndex] === oIndex && !quizSubmitted,
                          "border-green-500 bg-green-500 text-white": quizSubmitted && oIndex === quizItem.answer,
                          "border-red-500 bg-red-500 text-white": quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== quizItem.answer,
                        }
                      )}>
                        {(quizAnswers[qIndex] === oIndex || (quizSubmitted && oIndex === quizItem.answer)) && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {quizSubmitted && (
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setQuizMode(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tutorial
            </Button>
            {tutorial.nextTutorial && (
              <Button asChild>
                <Link to={`/tutorial/${tutorial.nextTutorial}`}>
                  Next Tutorial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar with sections */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tutorial Sections</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {tutorial.sections.map((section: any, index: number) => (
                  <Button
                    key={index}
                    variant={activeSection === index ? "default" : "ghost"}
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setActiveSection(index)}
                  >
                    <span className="truncate">{section.title}</span>
                  </Button>
                ))}
                {tutorial.quiz && tutorial.quiz.length > 0 && (
                  <Button
                    variant={quizMode ? "default" : "ghost"}
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setQuizMode(true)}
                  >
                    <span className="truncate">Quiz</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tutorial Info Card */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{tutorial.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{tutorial.level}</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resources</h3>
                <ul className="space-y-1">
                  {tutorial.resources.map((resource: any, index: number) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        {resource.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-0 space-y-0">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{tutorial.level}</Badge>
                  <Badge variant="outline">{tutorial.duration}</Badge>
                </div>
                <h1 className="text-2xl font-bold">{tutorial.title}</h1>
                <p className="text-muted-foreground">{tutorial.description}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {quizMode ? (
                renderQuiz()
              ) : (
                <div className="space-y-6">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="playground">Try It</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="pt-4">
                      <div className="prose prose-stone dark:prose-invert max-w-none markdown-content">
                        <ReactMarkdown>
                          {tutorial.sections[activeSection].content}
                        </ReactMarkdown>
                      </div>
                    </TabsContent>
                    <TabsContent value="playground" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h3 className="font-medium mb-2">Interactive Code Playground</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Try out the concepts from this lesson in the editor below. Your code will be executed in real-time.
                          </p>
                          <div className="border rounded-md h-64 bg-card flex items-center justify-center">
                            <p className="text-muted-foreground">
                              Code editor would be integrated here (CodeMirror, Monaco Editor, etc.)
                            </p>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" className="mr-2">
                              <Play className="mr-2 h-4 w-4" /> Run Code
                            </Button>
                            <Button variant="outline">
                              <FileCode className="mr-2 h-4 w-4" /> Reset
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Navigation buttons */}
                  <div className="flex justify-between pt-6">
                    {tutorial.prevTutorial ? (
                      <Button variant="outline" asChild>
                        <Link to={`/tutorial/${tutorial.prevTutorial}`}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous Lesson
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
                        <Link to="/tutorials">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          All Tutorials
                        </Link>
                      </Button>
                    )}

                    {activeSection < tutorial.sections.length - 1 ? (
                      <Button onClick={() => setActiveSection(activeSection + 1)}>
                        Next Section
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => setQuizMode(true)}>
                        Take Quiz
                        <List className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-6xl">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link to="/tutorials" className="hover:text-foreground">Tutorials</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to="/tutorials#javascript" className="hover:text-foreground">JavaScript</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium truncate">{tutorial.title}</span>
      </div>

      {/* Main content */}
      {renderContent()}
    </div>
  );
}