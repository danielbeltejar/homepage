$$$
title: "Running DeepSeek-R1 Locally on a Kubernetes Cluster: A Professional Case Study"
date: "2024-01-25"
author: "Daniel Beltejar"
$$$

## Introduction

This article explains how to configure a Kubernetes cluster with GPU support and run DeepSeek-R1 as a local API-powered large language model. By integrating NVIDIA's container toolkit, the Kubernetes NVIDIA device plugin, and a custom RuntimeClass, this setup offers a robust solution without reliance on external services. It provides complete control over the model and data while significantly reducing costs.

![Open Web UI](https://danielbeltejar.es/assets/images/posts/1/open-web-ui-deepseek.webp)

---

## The Setup

### NVIDIA Toolkit Installation

- Installed the `nvidia-container-toolkit` along with the necessary CUDA drivers on a Red Hat-based system.
- This setup integrates container workloads with GPU capabilities, enabling efficient hardware acceleration.

### Configuring the Kubernetes Device Plugin for NVIDIA

- Deployed the NVIDIA device plugin to allow Kubernetes to detect and utilize GPUs within the cluster.
- The plugin accurately assigns GPU resources to pods when needed.
- Defined a specific RuntimeClass that ensures pods requiring GPUs are scheduled only on compatible nodes.

### Deploying DeepSeek-R1

- Deployed **DeepSeek-R1** as a local API using Helm through the official [ollama-helm chart](https://artifacthub.io/packages/helm/ollama-helm/ollama).
- The model leverages GPU acceleration to process requests with high speed and low latency.
- By running DeepSeek-R1 locally, dependency on external APIs is eliminated, ensuring greater control over both data and outcomes.

---

## Case Study: Hardware Specifications and Performance

### Hardware Specifications

- **RAM:** 64GB DDR5 – Sufficient bandwidth to support GPU operations when VRAM is limited.
- **CPU:** Intel i9-13900 – Optimized for parallel tasks and capable of handling single-core prompt processing while utilizing GPU power.
- **GPU:** NVIDIA RTX 3060 with 12GB VRAM – Adequate for loading and executing the DeepSeek-R1 model efficiently in-memory.

### Performance Highlights

- With this configuration, DeepSeek-R1 generates approximately **40 tokens per second**.
- The performance is consistent and fluid even under intensive usage, delivering processing speed up to 10 times faster than an average human typist.

![Ollama Python API calls](https://danielbeltejar.es/assets/images/posts/1/ollama-python-api-calls-deepseek.webp)

---

## Key Lessons

1. **Independence from External Services:**  
   Running DeepSeek-R1 locally avoids the need for third-party APIs, enhancing data privacy, control, and reducing operational costs.

2. **Consistent and Predictable Performance:**  
   GPU acceleration ensures rapid responses and maintains performance even under heavy workloads.

3. **Cost Efficiency:**  
   Eliminating external APIs translates to unlimited usage without associated fees, making it a scalable solution for local deployments.

4. **Customization and Control:**  
   A local deployment provides the flexibility to customize and fine-tune the model according to specific use-cases and data requirements.

---

## Final Thoughts

Deploying DeepSeek-R1 on a local Kubernetes cluster offers a powerful and cost-effective solution for businesses and professionals seeking robust LLM capabilities. The integration of GPU acceleration not only enhances performance but also ensures reliability and scalability. This approach is especially valuable in scenarios where data sensitivity and operational independence are critical.

---

## References

- [NVIDIA Container Toolkit](https://github.com/NVIDIA/nvidia-docker)
- [Kubernetes NVIDIA Device Plugin](https://github.com/NVIDIA/k8s-device-plugin)
- [Ollama Helm Chart](https://artifacthub.io/packages/helm/ollama-helm/ollama)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
