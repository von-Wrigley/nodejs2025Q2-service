FROM postgres:17-alpine

# Опционально: задаем переменные окружения для PostgreSQL
ENV POSTGRES_USER=homeLib
ENV POSTGRES_PASSWORD=12345
ENV POSTGRES_DB=myDB

# Копируем SQL-скрипты для инициализации БД (если нужны)
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Можно добавить healthcheck (проверка работоспособности)
HEALTHCHECK --interval=10s --timeout=3s \
  CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# Стандартный порт PostgreSQL
EXPOSE 5432