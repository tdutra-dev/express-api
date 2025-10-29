# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (including dev dependencies for nodemon)
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]