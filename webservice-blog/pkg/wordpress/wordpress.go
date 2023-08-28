package wordpress

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func GetLatestWordpressBlogEntry() ([]byte, error) {
	// URL of the WordPress site's REST API endpoint for posts
	apiUrl := "https://blog.danielbeltejar.es/wp-json/wp/v2/posts?per_page=1&orderby=date"

	// Send an HTTP GET request to the API endpoint
	response, err := http.Get(apiUrl)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Request failed with status code: %s", response.Status)
	}

	// Parse the JSON response into a slice of generic maps
	var posts []map[string]interface{}
	decoder := json.NewDecoder(response.Body)
	if err := decoder.Decode(&posts); err != nil {
		return nil, err
	}

	// Check if there is at least one post
	if len(posts) == 0 {
		return nil, fmt.Errorf("No posts found in the response")
	}

	// Convert the result to JSON
	jsonResponse, err := json.Marshal(posts)
	if err != nil {
		return nil, err
	}

	return jsonResponse, nil
}
