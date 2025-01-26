async function fetchData() {
    try {
        const response = await fetch('https://danielbeltejar.es/api/posts/newest');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const url = `https://danielbeltejar.es/posts/${data.filename.replace('.md', '')}`;
        updateLink(url, data.title);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateLink(url, title) {
    const linkElement = document.getElementById("blog-link");
    if (linkElement) {
        linkElement.style.opacity = "1";
        linkElement.href = url;
        const titleElement = linkElement.querySelector('.max-h-4');
        if (titleElement) {
            titleElement.textContent = `${title}`;
        }
    }
}

fetchData();
