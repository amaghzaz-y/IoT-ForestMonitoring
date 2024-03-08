FROM node:latest
RUN mkdir /app
COPY . /app
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
ENV TTN_MQTT="NNSXS.JGATEVER4EAX7IIIILE7TVQK5XEWKYYEGCKGAAI.CNDX436MJNT4R2FQLYYRPIU6CWQS7RPRN3FQ3LKXCBWY6LOWVARQ"
ENV TTN_USER="002-iot-lora@ttn"
RUN cd server
RUN npm install
RUN npx prisma db push
RUN cd ..
RUN cd web
RUN npm install
RUN npm build
