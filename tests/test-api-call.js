const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testOpenSpecAPI() {
    console.log('Testing OpenSpec API endpoint...');

    const form = new FormData();
    
    // Add the zip file
    form.append('zipFile', fs.createReadStream('temp/update-hello-world-to-loaded.zip'));
    form.append('repoName', 'for-test-github-app');

    try {
        // Make request to the openspec-implement endpoint with the correct prefix
        const response = await axios.post('http://localhost:3000/openspec/openspec-implement', form, {
            headers: form.getHeaders(),
            timeout: 10000
        });
        
        console.log('API Response:', response.data);
        
        if (response.data.taskId) {
            console.log(`Task created successfully with ID: ${response.data.taskId}`);
            
            // Now try to check the task status
            setTimeout(async () => {
                try {
                    const statusResponse = await axios.get(`http://localhost:3000/openspec/task-status/${response.data.taskId}`);
                    console.log('Task Status:', statusResponse.data);
                } catch (statusError) {
                    console.error('Error checking task status:', statusError.response?.data || statusError.message);
                }
            }, 2000); // Wait 2 seconds before checking status
        }
        
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            console.error('Data:', error.response.data);
        }
    }
}

testOpenSpecAPI();