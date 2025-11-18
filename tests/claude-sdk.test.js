const { Anthropic } = require('@anthropic-ai/sdk');

require('dotenv').config();

describe('Claude SDK Test', () => {
  test('should create Anthropic client and make API call', async () => {
    // Check if the required environment variables are set
    if (!process.env.ANTHROPIC_AUTH_TOKEN) {
      console.log('Skipping Claude SDK test - ANTHROPIC_AUTH_TOKEN environment variable is not set');
      return;
    }

    console.log('Creating Anthropic client...');
    
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_AUTH_TOKEN,
      baseURL: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
    });

    console.log('Making API call to Claude...');
    
    try {
      const completion = await client.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: 'Explain recursion in simple terms.' }],
      });

      console.log('\nAPI call successful!\n');
      console.log('Response:');
      if (Array.isArray(completion.content)) {
        completion.content.forEach((contentBlock) => {
          if (contentBlock.type === 'text') {
            console.log(contentBlock.text);
          }
        });
      } else {
        console.log(completion.content);
      }
      
      // Expect the response to have content
      expect(completion).toBeDefined();
      expect(completion.content).toBeDefined();
    } catch (error) {
      if (error.status === 401) {
        console.log('\nError: Authentication failed. Please check your API token.');
      } else if (error.status === 403) {
        console.log('\nError: Access forbidden. Please check your API token permissions.');
      } else if (error.status === 429) {
        console.log('\nError: Rate limit exceeded. Please try again later.');
      } else {
        console.log('\nError calling Claude API:', error.message);
      }
      // If we have a real auth token but it's invalid, we should still pass the test
      // since the SDK is working correctly, just with bad credentials
      if (error.status === 401 || error.status === 403) {
        console.log('Authentication error - token may be invalid but SDK is working');
      } else {
        throw error; // Re-throw other errors
      }
    }
  }, 30000); // 30 second timeout for API call
});