package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"webservice-blog/pkg/handlers"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/latest", handlers.LatestBlogEntryHandler).Methods("GET")
	r.HandleFunc("/healthz", handlers.HealthHandler).Methods("GET")

	http.Handle("/", r)

	fmt.Println("Listening on :8080...")
	http.ListenAndServe(":8080", nil)
}
