package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"webservice-blog/pkg/handlers"
)

func main() {
	r := mux.NewRouter()
	r.Use(LoggerMiddleware)
	r.HandleFunc("/latest", handlers.LatestBlogEntryHandler).Methods("GET")
	r.HandleFunc("/healthz", handlers.HealthHandler).Methods("GET")
	http.Handle("/", r)

	http.Handle("/", r)

	fmt.Println("Listening on :8080...")
	http.ListenAndServe(":8080", nil)
}

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Request URL: %s\n", r.URL.Path)

		next.ServeHTTP(w, r)
	})
}
