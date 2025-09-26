document.getElementById('review-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const resultDiv = document.getElementById('review-result');
    resultDiv.textContent = 'Loading...';

    try {
        const response = await fetch('/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        resultDiv.textContent = result.diff;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred while fetching the review.';
    }
});