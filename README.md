# CSV Service

Microservicio para convertir archivos CSV a JSON.

## Instalacion

```bash
npm install
```

## Uso

### Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

| Variable | Default | Descripcion |
|----------|---------|-------------|
| `PORT` | `3000` | Puerto del servidor |
| `MAX_FILE_SIZE` | `10485760` | Tamaño maximo de subida en bytes (10MB) |
| `CORS_ORIGIN` | `*` | Origen permitido para CORS |

### Iniciar servidor

```bash
# Produccion
npm start

# Desarrollo (con recarga automatica)
npm run dev
```

### Endpoints

#### `POST /` — Subir CSV (vista web)

Sube un archivo CSV y muestra el JSON convertido en el navegador.

```
curl -F "csvFile=@datos.csv" http://localhost:3000/
```

#### `POST /csv` — API JSON

Sube un archivo CSV y devuelve el JSON como respuesta.

```
curl -F "csvFile=@datos.csv" http://localhost:3000/csv
```

#### `POST /csv/download` — Descargar JSON

Sube un archivo CSV y descarga el JSON como archivo `.json`.

```
curl -F "csvFile=@datos.csv" http://localhost:3000/csv/download -o output.json
```

#### `GET /health` — Health check

```
curl http://localhost:3000/health
```

Respuesta: `{ "status": "ok", "timestamp": "...", "uptime": ... }`

### Delimitador personalizado

Los endpoints `/csv` y `/csv/download` aceptan un query param `delimiter`:

```
curl -F "csvFile=@datos.csv" "http://localhost:3000/csv?delimiter=;"
```

## Tests

```bash
npm test
```

## Tecnologias

- **Express** — Framework web
- **Helmet** — Cabeceras HTTP de seguridad
- **CORS** — Control de acceso跨域
- **Multer** — Subida de archivos
- **Papaparse** — Parseo de CSV
- **Pino** — Logging estructurado
- **Compression** — Compresion Gzip
- **Jest + Supertest** — Tests
- **Handlebars** — Template engine
