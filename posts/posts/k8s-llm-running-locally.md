Configuré un clúster Kubernetes optimizado para IA acelerada por GPU. Instalé el plugin de dispositivo NVIDIA, creé una RuntimeClass personalizada y desplegué DeepSeek-R1 con ollama, como API LLM local.  

## Pasos  
1. **Instalar `nvidia-container-toolkit`**  
   Utilicé `dnf` en Red Hat para instalar las herramientas necesarias.  

2. **Plugin NVIDIA**  
   Instalé el plugin en Kubernetes para habilitar GPUs y asignarlas a tareas específicas.  

3. **RuntimeClass NVIDIA**  
   Creé una clase personalizada para garantizar que los pods con requisitos de GPU se programen en nodos compatibles.  

4. **Despliegue de DeepSeek-R1**  
   Desplegué DeepSeek-R1 como API local, accediendo al modelo sin depender de servicios externos.  

## 🛠️ Hardware del nodo de Kubernetes 
- **RAM**: 64GB DDR5 (DDR5 ideal por su ancho de banda por si tu GPU no tiene suficiente VRAM).  
- **CPU**: Intel i9-13900. (Los prompts utilizan un core aun utilizando GPU)
- **GPU**: NVIDIA RTX 3060 (12GB VRAM, donde se encontrara cargado el LLM).  

Con esta configuración, DeepSeek-R1 genera **40 tokens/s**, manteniendo un rendimiento fluido.  

## 🤑 Ventajas Locales  
- Sin costes de APIs externas.  
- Respuestas rápidas gracias a la GPU.  
- Uso ilimitado con resultados consistentes.  
