FROM node:18-alpine
WORKDIR /app
# Only copy dependency files first for better cache
COPY package.json package-lock.json ./
RUN npm ci
# Now copy the rest of the code
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
