// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the expressapi database
db = db.getSiblingDB('expressapi');

// Create a user for the application
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'expressapi'
    }
  ]
});

// Create some initial collections if needed
db.createCollection('users');

print('Database initialized successfully!');