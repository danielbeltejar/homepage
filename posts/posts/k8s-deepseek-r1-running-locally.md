$$$
title: Running DeepSeek-R1 locally on a Kubernetes cluster
date: 2024-01-25
author: Daniel Beltejar 
$$$

Configuré un clúster de Kubernetes con GPU, integrando el plugin NVIDIA y una RuntimeClass personalizada para desplegar DeepSeek-R1 como API LLM local. Este enfoque elimina la dependencia de servicios externos, reduciendo gastos y ofreciendo control total sobre el modelo y dato.

![Open Web UI](https://danielbeltejar.es/assets/images/posts/1/open-web-ui-deepseek.png)

### 1. Instalación del toolkit de NVIDIA
- Instalé `nvidia-container-toolkit` y los drivers de `cuda` en un sistema operativo basado en Red Hat.
- Esto permite la integración de contenedores con la GPU para aprovechar su aceleración.

### 2. Configuración del K8s Device Plugin de NVIDIA en Kubernetes
- Instalé el plugin de dispositivo NVIDIA para habilitar la detección y el uso de GPUs dentro del clúster.
- Este plugin permite la asignación precisa de recursos de GPU a los pods que los necesitan. Repositorio oficial: [NVIDIA/k8s-device-plugin](https://github.com/NVIDIA/k8s-device-plugin)
- Definí una `RuntimeClass` específica para tareas que requieren GPU, garantizando que los pods se programen únicamente en nodos compatibles.

### 4. Despliegue de DeepSeek-R1
- Desplegué **DeepSeek-R1** como una API local utilizando **ollama** con Helm. Chart oficial de Helm: [ollama-helm](https://artifacthub.io/packages/helm/ollama-helm/ollama)
- El modelo se ejecuta directamente en la GPU, procesando peticiones con alta velocidad y baja latencia.
- Este despliegue elimina cualquier dependencia de APIs externas, proporcionando un control absoluto sobre los datos y los resultados.

---

## Especificaciones del hardware del nodo

- **RAM**: 64GB DDR5, ideal por el ancho de banda necesario cuando la VRAM de la GPU no es suficiente.
- **CPU**: Intel i9-13900, diseñado para aprovechar su potencia en tareas paralelas y manejar prompts en un único núcleo, incluso cuando se usa la GPU.
- **GPU**: NVIDIA RTX 3060 con 12GB de VRAM, suficiente para cargar y ejecutar en memoria el modelo **DeepSeek-R1** de manera eficiente.

Con esta configuración, **DeepSeek-R1** genera aproximadamente **40 tokens por segundo**, manteniendo un rendimiento fluido incluso en tareas intensivas. x10 la velocidad de escritura de una persona.

---

![Ollama Python API calls](https://danielbeltejar.es/assets/images/posts/1/ollama-python-api-calls-deepseek.png)


## Ventajas de utilizar DeepSeek-R1 en local

1. **Independencia de servicios externos**:  
   Ejecutar **DeepSeek-R1** localmente elimina la necesidad de conectarse a APIs de terceros, garantizando mayor privacidad, control sobre los datos y costes reducidos.

2. **Rendimiento consistente**:  
   Gracias a la aceleración por GPU, las respuestas son rápidas y el rendimiento es predecible, incluso bajo cargas de trabajo intensivas.

3. **Coste reducido**:  
   No hay costes asociados al uso de APIs externas (eg. OpenAI), lo que permite un uso ilimitado.

4. **Alta velocidad de respuesta**:  
   Genera **40 tokens por segundo** (con mi hardware), lo que es 10 veces más rápido que la escritura media de un humano.

---

## Por qué elegir DeepSeek-R1

**DeepSeek-R1** es una solución local diseñada para proporcionar una API LLM robusta y de alto rendimiento. Su despliegue en un entorno controlado como Kubernetes garantiza:
- Seguridad y privacidad total sobre los datos.
- Eliminación de gastos por uso.
- Alta capacidad de personalización.
- Modelo avanzado con capacidades de razonamiento.