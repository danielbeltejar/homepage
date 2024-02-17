package wordpress

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func GetLatestWordpressBlogEntry() ([]byte, error) {
	apiUrl := "http://wordpress-service.pro-wordpress-blog.svc.cluster.local/wp-json/wp/v2/posts?per_page=1&orderby=date"

	response, err := http.Get(apiUrl)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Request failed with status code: %s", response.Status)
	}

	var posts []map[string]interface{}
	decoder := json.NewDecoder(response.Body)
	if err := decoder.Decode(&posts); err != nil {
		return nil, err
	}

	if len(posts) == 0 {
		return nil, fmt.Errorf("No posts found in the response")
	}

	jsonResponse, err := json.Marshal(posts)
	if err != nil {
		return nil, err
	}

	return jsonResponse, nil
}
