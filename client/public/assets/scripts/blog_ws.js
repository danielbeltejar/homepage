    async function fetchData() {
        try {
            const response = await fetch('https://danielbeltejar.es/v1/blog/latest'); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateLink(data.url, data.title);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function updateLink(url, title) {
        const linkElement = document.getElementById("blog-link");
        linkElement.style.opacity = "1";
        if (linkElement) {
            linkElement.href = url;
            const titleElement = linkElement.querySelector('.max-h-4');
            if (titleElement) {
                titleElement.textContent = title + " - learn more";
            }
        }
    }

    // Call the fetchData function to update the link when the page loads
    fetchData();





