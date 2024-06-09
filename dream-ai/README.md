I apologize for the confusion. Let's use the actual project structure from the repository. Here is the README with the correct structure:

---

# Dream Journal with AI

Welcome to the Dream Journal with AI! This project aims to provide a platform for logging and analyzing your dreams using AI-powered tools. The repository includes a web application that allows users to create, manage, and analyze their dream entries.

## Features

- **Dream Logging:** Users can log their dreams with detailed descriptions.
- **AI Analysis:** The application uses AI to analyze dream entries, providing insights and patterns.
- **User-Friendly Interface:** Easy-to-use interface for managing dream entries.
- **Data Security:** Ensures that all dream data is securely stored and managed.

## Getting Started

### Prerequisites

To run this project locally, you will need the following:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (for storing dream entries)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kristo-baricevic/dream-journal-with-ai.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dream-journal-with-ai
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   NEXT_PUBLIC_AI_API_KEY=your_ai_service_api_key
   ```

2. Make sure your MongoDB server is running.

### Running the Application

To start the application, run:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Project Structure

```
.
├── README.md
├── next.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── src
│   ├── components
│   │   ├── DreamEntry.js
│   │   └── Navbar.js
│   ├── pages
│   │   ├── _app.js
│   │   ├── api
│   │   │   └── dreams.js
│   │   ├── index.js
│   │   └── log-dream.js
│   └── styles
│       ├── Home.module.css
│       └── globals.css
└── dream-ai
    ├── analysis.js
    └── api.js
```

## Usage

### Logging Dreams

1. Navigate to the Dream Journal homepage.
2. Click on "Log a Dream" to create a new dream entry.
3. Fill in the details of your dream and save.

### Analyzing Dreams

1. Go to the "Analyze Dreams" section.
2. Select a dream entry to view its AI analysis.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, please contact us at [your-email@example.com].

---

Feel free to adjust the content to better suit your needs or to add more specific details related to your project.