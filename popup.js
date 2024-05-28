document.getElementById('quickButton').addEventListener('click', () => {
  submitRequest('quick');
});

document.getElementById('detailedButton').addEventListener('click', () => {
  submitRequest('detailed');
});

async function submitRequest(responseType) {
  const codeInput = document.getElementById('codeInput').value;
  const responseOutput = document.getElementById('responseOutput');
  responseOutput.innerHTML = 'Processing...';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`//Enter your openai api key
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: codeInput }],
        max_tokens: responseType === 'quick' ? 100 : 300  // Adjust max_tokens based on the response type
      })
    });

    const data = await response.json();
    responseOutput.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
  } catch (error) {
    responseOutput.innerHTML = 'Error: ' + error.message;
  }
}
