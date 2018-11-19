FROM node:10-alpine
# Define working directory
WORKDIR /node-app
# Install deps for production only
COPY ./package*.json ./
RUN npm install --production && \
  npm cache clean --force
COPY ./src ./src
# Set system environments
ENV NODE_ENV=production
ENV PORT=3000
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE ${PORT}
# Start the app
CMD ["npm", "start"]