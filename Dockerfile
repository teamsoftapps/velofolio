# Use the latest Node.js image
FROM node:current-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Force install all dependencies (including dev)
RUN npm install --include=dev

# Copy the rest of the project
COPY . .

# Build your Next.js app (Tailwind runs here)
RUN npm run build

# Expose port
EXPOSE 3000

# Start app in production
CMD ["npm", "start"]
