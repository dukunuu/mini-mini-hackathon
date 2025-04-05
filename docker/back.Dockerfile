FROM golang:1.24-alpine

WORKDIR /code

RUN go install github.com/air-verse/air@latest
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

COPY ./backend/go.mod ./
RUN go mod download

CMD ["air", "-c", ".air.toml"]
