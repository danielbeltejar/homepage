import requests


def get_latest_wordpress_blog_entry():
    # Define the base URL of your WordPress site's REST API
    base_url = "https://blog.danielbeltejar.es/wp-json/wp/v2"

    # Define the endpoint for retrieving the latest post
    endpoint = "/posts?per_page=1&_embed"

    # Make the GET request to the API
    response = requests.get(base_url + endpoint)

    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()

        if data:
            # Extract the latest blog post's title and content
            latest_post = data[0]
            post_title = latest_post["title"]["rendered"]
            post_content = latest_post["content"]["rendered"]

            return {
                "title": post_title,
                "content": post_content
            }
        else:
            return {"error": "No blog posts found."}
    else:
        return {"error": "Failed to retrieve blog post."}


# Test the function
latest_blog_entry = get_latest_wordpress_blog_entry()
print(latest_blog_entry)
