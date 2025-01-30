# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first to avoid caching issues
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port your app runs on (update if needed)
EXPOSE 3000

# Command to start the server
CMD ["node", "index.js"]
