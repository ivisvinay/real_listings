# server/Dockerfile
FROM node:18-alpine

WORKDIR /src/

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Create uploads directory
RUN mkdir -p uploads && chmod -R 755 uploads

# Expose the port
EXPOSE 5509

# Start the server
CMD ["npm", "run", "start"]