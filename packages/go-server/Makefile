SRC_DIR = cmd/patitas

build:
	go build -o bin/patitas $(SRC_DIR)/main.go 

run: build
	./bin/patitas

test:
	go test -v ./...

clean:
	rm -rf bin
