# Server

## Installation

### Go
Hay que tener instalada la version **1.22**.

Para instalar las dependencias ejecutar:
```
go mod tidy
```

Hay que instalar PostgresSQL.

Usar las queries de la carpeta database/migrations para crear el esquema.

## Usage

Para correr el servidor ejecutar:
```
make run
```

Conectarse a http://localhost:8080/ para usar el GraphQL playground

## GraphQL Generator
Luego de editar los archivos con los esquemas, ejecutar:
```
go generate ./...
```
