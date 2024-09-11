# Use the official Node.js image from Docker Hub
FROM node:18-alpine as node-builder

# Install any additional programs or dependencies you might need
# (Uncomment the following line if you need to install additional packages)
# RUN apk add --no-cache your-package-here

# Set the working directory inside the container
WORKDIR /app

# Install global npm packages if needed (Uncomment if required)
# RUN npm install -g your-global-package
RUN npm install express

# Set up environment variables if needed
# ENV NODE_ENV=production

# Build Node.js Application
# Step 1: Copy the package.json and package-lock.json (if available)
COPY Frontend/package*.json ./

# Step 2: Install the Node.js dependencies
RUN npm install --production

# Step 3: Copy the rest of the application code to the container
COPY . .
# Expose the port that your Node.js app runs on
EXPOSE 3000

# Step 4: Command to start the Node.js application
CMD ["node", "server.js"]
# Start Node.js server
# CMD ["sh", "-c", "node /app/server.js"]


# RUN npm run build
# The container will just run a shell unless otherwise specified
# CMD ["sh"]

