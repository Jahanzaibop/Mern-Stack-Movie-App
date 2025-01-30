# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port your server runs on (usually 5000 or 8080)
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
