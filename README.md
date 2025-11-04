
# PyClean: AI Python Code Beautifier

![PyClean Banner](https://raw.githubusercontent.com/abdul-ahad-s/pyclean/main/public/Interface.png)

**PyClean is a futuristic web app that uses the Google Gemini API to automatically format messy Python code according to PEP 8 standards. It features a real-time, split-screen editor to compare your code before and after, along with a detailed analysis of every change made by the AI.**

---

## ✨ Features

-   **🤖 AI-Powered Formatting:** Leverages the power of the Gemini API to intelligently analyze and refactor your Python code.
-   **📜 PEP 8 Compliant:** Ensures your code adheres to the official Python style guide, improving consistency and readability.
-   **↔️ Side-by-Side View:** Instantly visualize the differences between your original code and the beautified version in a clean, intuitive split-screen editor.
-   **🔬 Detailed Analysis:** Receive a line-by-line breakdown of every correction, explaining *why* the change was made, which is great for learning best practices.
-   **⚡ Modern & Fast:** Built with React and Tailwind CSS for a responsive and seamless user experience.
-   **🚀 Example Snippets:** Get started immediately by trying out built-in examples of poorly formatted code.

## 🤔 What is PEP 8?

**PEP 8** (Python Enhancement Proposal 8) is the official style guide for Python code. It's a set of conventions and recommendations for writing clean, readable, and maintainable Python.

Following PEP 8 is not about enforcing strict rules; it's about improving the consistency of code written by different developers, which makes projects easier to read, understand, and manage over time. Key aspects include guidelines on code layout, naming conventions, and comments.

## 💡 Why is PyClean useful for developers?

PyClean is more than just a code formatter; it's a productivity and learning tool.

-   **Save Time:** Automate the tedious process of cleaning up code formatting. Spend less time on nitpicks and more time on solving real problems.
-   **Learn Best Practices:** The AI's explanations for each change serve as a live tutor, helping you internalize PEP 8 standards and become a better Python developer.
-   **Improve Code Quality:** Consistently formatted code is easier to debug and review. PyClean helps you maintain a high standard of quality in your projects.
-   **Streamline Code Reviews:** Submit pull requests with confidence, knowing that your code is already formatted correctly, allowing reviewers to focus on logic and architecture.

## 🚀 Getting Started

Follow these steps to run PyClean on your local machine.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari, Edge).
-   [Node.js](https://nodejs.org/) installed on your computer to run a local server.

### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/your-username/pyclean.git
cd pyclean
```

### 2. Set Up Your Gemini API Key

This application requires a Google Gemini API key to function.

1.  Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Open the file `services/geminiService.ts` in your code editor.
3.  Locate the following line of code:
    ```typescript
    const API_KEY = process.env.API_KEY;
    ```
4.  Replace `process.env.API_KEY` with your actual API key as a string:
    ```typescript
    const API_KEY = "YOUR_GEMINI_API_KEY"; // <-- Paste your key here
    ```

> **⚠️ Security Warning:** Do not commit your API key to a public repository. This method is suitable for local development only. If you deploy this application, use environment variables to secure your key.

### 3. Run the Application

You can use any simple local web server to run the application. The `serve` package is a great, hassle-free option.

1.  Install `serve` if you haven't already:
    ```bash
    npm install -g serve
    ```
2.  Run the server from the root of the project directory:
    ```bash
    serve -s .
    ```
    *(The `-s` flag is important; it ensures that the app works correctly with client-side routing.)*

3.  Open your web browser and navigate to the local address provided by the server (usually `http://localhost:3000`).

You should now see the PyClean application running!

## 🛠️ Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview) - The AI model powering the code formatting and analysis.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
-   [Prism.js](https://prismjs.com/) - A lightweight, extensible syntax highlighter.
-   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.

