package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"webservice-blog/pkg/wordpress"
)

type BlogEntry struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

func LatestBlogEntryHandler(w http.ResponseWriter, r *http.Request) {
	jsonResponse, err := wordpress.GetLatestWordpressBlogEntry()
	if err != nil {
		http.Error(w, "Error getting latest blog entry", http.StatusInternalServerError)
		return
	}

	// Parse the original JSON response into a slice of maps
	var posts []map[string]interface{}
	if err := json.Unmarshal(jsonResponse, &posts); err != nil {
		http.Error(w, "Error parsing JSON response", http.StatusInternalServerError)
		return
	}

	// Check if there is at least one post
	if len(posts) == 0 {
		http.Error(w, "No posts found in the response", http.StatusNotFound)
		return
	}

	title := posts[0]["title"].(map[string]interface{})["rendered"].(string)
	if strings.Contains(title, "-") {
		title = strings.Split(title, " - ")[0]
	} else if strings.Contains(title, " – ") {
		title = strings.Split(title, " – ")[0]
	}

	// Extract and format the desired data
	entry := BlogEntry{
		Title: title,
		URL:   posts[0]["link"].(string),
	}

	// Marshal the simplified JSON object
	simplifiedJSON, err := json.Marshal(entry)
	if err != nil {
		http.Error(w, "Error creating simplified JSON response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to indicate JSON response
	w.Header().Set("Content-Type", "application/json")

	// Write the simplified JSON response to the response writer
	_, err = w.Write(simplifiedJSON)
	if err != nil {
		http.Error(w, "Error writing JSON response", http.StatusInternalServerError)
		return
	}
}
