import requests


def get_latest_wordpress_blog_entry():
    base_url = "http://wordpress-service.pro-wordpress-blog.svc.cluster.local/wp-json/wp/v2"

    endpoint = "/posts?per_page=1&_embed"

    response = requests.get(base_url + endpoint)

    if response.status_code == 200:
        data = response.json()

        if data:
            latest_post = data[0]
            post_url = latest_post["link"]

            post_title:str = latest_post["title"]["rendered"]
            if post_title.__contains__(" – "):
                post_title = post_title.split(" – ")[1]
            elif post_title.__contains__(" - "):
                post_title = post_title.split(" - ")[1]

            return {
                "title": post_title,
                "url": post_url
            }
        else:
            return {"error": "No blog posts found."}
    else:
        return {"error": "Failed to retrieve blog post."}
