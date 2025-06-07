# 🧩 Mini Course: Scalable Microservices

This repository contains the source code and infrastructure for a hands-on mini course on **Scalable Microservices**, focusing on modern architecture, asynchronous integration, observability, and cloud deployment using AWS.

---

## ✅ Goal

During this course, we built an application composed of **two independent microservices**, integrated through asynchronous messaging with RabbitMQ, exposed via API Gateway (Kong), using PostgreSQL for persistence, deployed on AWS ECS Fargate, and monitored through distributed observability.

---

## 🧠 Topics Covered

- Microservices using **NestJS** and **TypeScript**
- Asynchronous communication with **RabbitMQ**
- Integration via **API Gateway** using **Kong**
- Persistence with **PostgreSQL** and **Prisma ORM**
- Deployment on **AWS** using:
  - **Pulumi** (Infrastructure as Code)
  - **ECS Fargate**, **ECR**, and **Application Load Balancer**
- Observability with:
  - **Jaeger** for development
  - **Grafana** for production
- Eventual consistency and data replication between services
- Shared `contracts` package with interfaces and message topics
- Documentation using Swagger integrated with NestJS

---

## 🚀 Running the Project Locally

To spin up all services for local development, simply run:

```bash
./dev.sh
```

This script will start:

- The microservices
- RabbitMQ
- PostgreSQL
- Kong API Gateway
- Jaeger for distributed tracing
- All supporting services via Docker

---

## 📦 API Usage Example

You can interact with the **Orders API** by sending a `POST` request to the following route:

```
POST http://localhost:8000/orders/orders
```

> This route is exposed via **Kong API Gateway** and forwarded to the **Orders microservice**.

### 🔧 Request Body

Send the following JSON payload:

```json
{
  "customerId": "uuid-here", # A valid UUID representing the customer.
  "amount": 100 # A number indicating the order value.
}
```

### 🧪 cURL Example

```bash
curl -X POST http://localhost:8000/orders/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "'"$(uuid)"'",
    "amount": 100
  }'
```

### ⚙️ Behavior

When this request is received:

1. The **Orders API** stores the order in its PostgreSQL database.
2. It publishes an event to **RabbitMQ**, following the contract defined in the shared `contracts` package.
3. The **Invoices API** consumes the event and creates an associated invoice automatically.

This demonstrates asynchronous communication and eventual consistency between services using a message broker.

---

## 🔗 UI Access & Dashboards

Once the system is running (`./dev.sh`), you can access the following dashboards and tools in your browser:

| Service               | URL                                                                        | Notes                             |
| --------------------- | -------------------------------------------------------------------------- | --------------------------------- |
| **API Gateway**       | [http://localhost:8000](http://localhost:8000)                             | Entry point for all API routes    |
| **Orders API Docs**   | [http://localhost:8000/orders/docs](http://localhost:8000/orders/docs)     | Swagger UI for Orders API         |
| **Invoices API Docs** | [http://localhost:8000/invoices/docs](http://localhost:8000/invoices/docs) | Swagger UI for Invoices API       |
| **Jaeger Tracing**    | [http://localhost:16686](http://localhost:16686)                           | View distributed traces           |
| **Kong Dashboard**    | [http://localhost:8002](http://localhost:8002)                             | Kong Admin UI                     |
| **RabbitMQ**          | [http://localhost:15672](http://localhost:15672)                           | User: `guest` / Password: `guest` |

> ⚠️ Make sure Docker is running and `./dev.sh` has been executed before accessing these interfaces.

## 🧳 Project Structure

```
├── apps/              # Folders within microservices
├─── orders/           # Orders microservice (NestJS)
├─── invoices/         # Invoices microservice (NestJS)
├── contracts/         # Shared package with interfaces and topics
├── infra/             # Pulumi IaC for AWS infrastructure
├── kong/              # Kong configuration with custom template
├── docker-compose.yml # Local service orchestration
├── dev.sh             # Development bootstrap script
```

---

## ☁️ AWS Deployment

Infrastructure is provisioned using **Pulumi**, which sets up:

- ECS Clusters (Fargate)
- ECR Repositories
- Application Load Balancer (ALB)
- VPC, Subnets, and other networking resources

---

## 📊 Observability

- **Development:** Uses **Jaeger** for distributed tracing.
- **Production:** Uses **Grafana** dashboards, with support for structured logging and performance metrics.

---

## 📜 Certificate

> Completed the module "**Scalable Microservices Challenge**" with a total duration of **5 hours**, on **June 6, 2025**.

**Contents:**
Built two independent microservices, integrated them using asynchronous communication via RabbitMQ, modeled and created relational tables using PostgreSQL, applied concepts of eventual consistency and data replication, implemented observability with Grafana, added distributed tracing with Jaeger, and deployed using AWS Fargate with infrastructure as code using Pulumi.

📄 **[View Certificate](https://app.rocketseat.com.br/certificates/16fe86a4-9e55-4124-80f6-da616e4d7c24)**

---

## 🛠️ Technologies Used

- **TypeScript**
- **NestJS**
- **RabbitMQ**
- **Kong API Gateway**
- **PostgreSQL**
- **Prisma (ORM)**
- **Pulumi (IaC)**
- **Docker & Docker Compose**
- **AWS (ECS, ECR, Fargate, ALB)**
- **Jaeger**
- **Grafana**
- **Swagger**
