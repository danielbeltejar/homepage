---
title: "Automating TLS Certificates with cert-manager"
date: "2025-06-11"
author: "Daniel Beltejar"
---

## Introduction  
In today’s digital landscape, securing web services with TLS certificates is non-negotiable. However, manually managing certificates is error-prone, time-consuming, and unsustainable for growing systems. **cert-manager**, a Kubernetes-native certificate management tool, automates the issuance and renewal of TLS certificates using the ACME protocol. When paired with a custom webhook for OVH (a popular DNS provider), it enables seamless integration with OVH’s DNS API to automate DNS record updates, ensuring secure, self-service certificate management for both public and internal services.  

This article explores how to set up a **cert-manager webhook for OVH** (for internal DNS records) and use **Let’s Encrypt** (via ingress) for external DNS records. We’ll also share key lessons and real-world insights from implementing this solution.  

---

## The Setup  

### 1. Prerequisites  
- A Kubernetes cluster (e.g., EKS, AKS, or a local Minikube environment).  
- OVH account with API access enabled (for internal DNS).  
- Let’s Encrypt ACME account (for public DNS).  
- Basic familiarity with Kubernetes, Helm, and DNS.  

### 2. OVH API Integration  
OVH provides a RESTful API for DNS management. To interact with it:  
- Generate an API key from your OVH account.  

### 3. Configuring cert-manager  
- Install cert-manager via Helm.
- Create a `ClusterIssuer` or `Issuer` resource configured for **external services** using **HTTP-01 challenges** with Let’s Encrypt. This involves:
- Defining the `ClusterIssuer` with Let’s Encrypt’s ACME endpoint.
- Configuring an Ingress controller (e.g., NGINX) to handle HTTP-01 validation.
- Ensure the Ingress resource for external services points to the correct certificate issuer.

### 4. Configuring OVH webhook
- Install ovh webhook via Helm
- Create a `ClusterIssuer` or `Issuer` resource pointing to your OVH webhook for internal DNS challenges.
- Configure the webhook with your OVH API credentials (API key and secret).
- Test the configuration by requesting a certificate for an internal domain.  
- Ensure the Ingress resource for internal services points to the correct certificate issuer.

### 5. Automate A Record Registration from Kubernetes:
- Integrate the ovh-dns-updater.py (a fork of the original service, is made by me) microservice as a Kubernetes CronJob to automatically register A records based on the cluster's public IP address
- Ensuring the CronJob runs periodically to update DNS records without manual intervention.

![Internal DNS (OVH Webhook)](https://danielbeltejar.es/assets/images/posts/2/kubernetes-cronjob-ovh-dns-updater.webp)

---

## Case Study: Automating Certificates for Internal and External Services  

### **Internal DNS (OVH Webhook)**  
**Scenario**  
A company needs to secure internal microservices (e.g., `api.internal.example.com`) using DNS records managed internally.  

**Challenges**  
- Internal services are not exposed to the public internet.  
- OVH lacks built-in integration with cert-manager for internal DNS.  

**Solution**  
- Deploy a webhook microservice to manage OVH DNS records for internal domains.  
- Configured cert-manager to use the webhook for ACME challenges.  

**Outcome**  
- Automatic certificate issuance for internal services.  
- No downtime during certificate updates.  
- Scalable for new internal subdomains.  

![Internal DNS (OVH Webhook)](https://danielbeltejar.es/assets/images/posts/2/cluster-issuer-lets-encrypt-ovh.webp)

---

### **External DNS (Let’s Encrypt via Ingress)**  
**Scenario**  
A public-facing web app (`www.example.com`) requires automated TLS certificates for external users.  

**Challenges**  
- Public services require Let’s Encrypt integration.  
- Manual certificate management is error-prone.  

**Solution**  
- Configured cert-manager to use Let’s Encrypt via HTTP-01 challenges.  
- Used Kubernetes Ingress (e.g., NGINX) to handle Let’s Encrypt validation.  

**Outcome**  
- Fully automated certificate management for public domains.  
- Zero downtime for external users.  
- Reduced operational overhead.  

![Let’s Encrypt via Ingress](https://danielbeltejar.es/assets/images/posts/1/cluster-issuer-lets-encrypt-http.webp)

---

## Key Lessons  

1. **Choose the Right Cluster Issuer Based on Use Case**:  
   - Use Let’s Encrypt **OVH webhook** for **internal DNS** (non-public services).  
   - Use **Let’s Encrypt** for **external DNS** (public-facing services).  

2. **Security Best Practices**:  
   - Store OVH API keys securely using Kubernetes Secrets.  
   - Restrict webhook access to cert-manager using Kubernetes Network Policies.  

3. **Performance Considerations**:  
- Optimize the response time for ACME challenges, as OVH’s API has a 2-minute propagation delay for TXT records. This means that during the initial certificate creation, it might take up to 2 minutes for the certificate to be fully signed.
---

## Final Thoughts  
Automating TLS certificate management with cert-manager is a powerful way to secure your infrastructure. By combining **OVH webhook** for internal DNS and **Let’s Encrypt** via Ingress for external DNS, you can address both internal and public use cases seamlessly. This approach eliminates manual overhead, reduces downtime, and ensures compliance with modern security standards.  

As you adopt this pattern, consider contributing your webhook implementation to the cert-manager ecosystem or sharing insights with the community to help others avoid common pitfalls.  

---

## References  
1. [cert-manager Documentation](https://cert-manager.io/docs/)  
2. [OVH API Reference](https://developer.ovh.com/)  
3. [OVH Let’s Encrypt Webhook](https://artifacthub.io/packages/helm/cert-manager-webhook-ovh/cert-manager-webhook-ovh)  
4. [Kubernetes Helm Chart for cert-manager](https://github.com/jetstack/cert-manager-helm)  
5. [Let’s Encrypt ACME Documentation](https://letsencrypt.org/docs/)
6. [ovh-dns-updater.py](https://github.com/danielbeltejar/ovh-dns-updater)