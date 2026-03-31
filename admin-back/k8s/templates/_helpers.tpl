{{- define "app.fullname" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "app.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "app.selectorLabels" -}}
app: {{ .Chart.Name }}
{{- end }}
