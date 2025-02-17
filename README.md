# Data Privacy Vault

This project is a Data Privacy Vault that anonymizes Personally Identifiable Information (PII) such as names, emails, and phone numbers in a given message. It provides an API endpoint to receive a message and return an anonymized version of it.

## Project Structure

```
data-privacy-vault
├── src
│   ├── app.js                     # Entry point of the application
│   ├── controllers
│   │   └── anonymizeController.js  # Logic for anonymizing PII
│   ├── routes
│   │   └── anonymizeRoutes.js      # Route definitions for the API
│   └── utils
│       └── anonymize.js            # Utility functions for anonymization
├── package.json                    # npm configuration file
├── .gitignore                      # Files and directories to ignore by Git
└── README.md                       # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd data-privacy-vault
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

   The server will start on `http://localhost:3001`.

## Usage Example

To anonymize a message containing PII, you can use the following `curl` command:

```bash
curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Dago Borda con email dborda@gmail.com y teléfono 3152319157"}'
```

### Expected Response
'{"prompt":"Quiero una propuesta de trabajo atractiva para un rol de devops de mi empresa de tecnología a Dago Borda, su email es dborda@gmail.com y su teléfono es 3152319157"}'

## Contributing

Feel free to submit issues or pull requests to improve the project.