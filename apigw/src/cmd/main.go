package main

import (
	"fmt"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"net/http"
)

type RouteConfig struct {
	Pattern    string   `yaml:"pattern"`
	Method     []string `yaml:"method"`
	BackendDNS string   `yaml:"backend_dns"`
}

type GatewayConfig struct {
	Routes []RouteConfig `yaml:"routes"`
}

type Route struct {
	Pattern        string
	BackendDNS     string
	BackendApp     http.Handler
	AllowedMethods []string
}

type Gateway struct {
	Routes []Route
}

func NewGateway() *Gateway {
	return &Gateway{}
}

func (g *Gateway) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	for _, route := range g.Routes {
		if r.URL.Path == route.Pattern {
			methodAllowed := false
			for _, method := range route.AllowedMethods {
				if r.Method == method {
					methodAllowed = true
					break
				}
			}
			if !methodAllowed {
				http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
				return
			}

			route.BackendApp.ServeHTTP(w, r)
			return
		}
	}
	http.NotFound(w, r)
}

func (g *Gateway) LoadConfig(filename string) {
	configData, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatal("Error reading configuration file:", err)
	}

	var gatewayConfig GatewayConfig
	err = yaml.Unmarshal(configData, &gatewayConfig)
	if err != nil {
		log.Fatal("Error parsing YAML:", err)
	}

	var routes []Route
	for _, routeConfig := range gatewayConfig.Routes {
		routes = append(routes, Route{
			Pattern:        routeConfig.Pattern,
			BackendDNS:     routeConfig.BackendDNS,
			AllowedMethods: routeConfig.Method,
		})
	}

	g.Routes = routes
}

func (g *Gateway) SetBackendApp(backendApp http.Handler) {
	for i := range g.Routes {
		g.Routes[i].BackendApp = backendApp
	}
}

func main() {
	g := NewGateway()

	// Load configuration
	g.LoadConfig("config/config.yaml")

	// Set the backend application handler
	g.SetBackendApp(getBackendApp())

	log.Println("API Gateway listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", g))
}

func getBackendApp() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Backend App")
	})
}
