# Use specific Node.js version
FROM node:20-alpine AS development

# Create app directory
WORKDIR /app

# Copy necessary files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install
RUN npm install dotenv

# Load environment variables from .env file
COPY .env .
RUN npm run dotenv

# Expose the port
EXPOSE 8000
EXPOSE 27017

# Start the app
CMD ["npm", "start"]
