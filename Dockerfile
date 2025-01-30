# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from backend directory
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire backend folder
COPY backend/ .

# Expose the port (if your backend runs on 5000)
EXPOSE 3000

# Command to start the server
CMD ["node", "index.js"]
