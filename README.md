# 🚀 Simple Node.js CI/CD Pipeline

A lightweight calculator API built with Node.js, automated with Jenkins and Docker.

✅ Features

    Addition endpoint (/add?a=2&b=3)

    Unit testing with Jest

    Dockerized for container deployment

    Jenkins pipeline for CI/CD

    Security scanning with npm audit

## Run Locally
npm install
npm start

## Run Tests
npm test

## 🐳 Docker Build
docker build -t simple-node-app .
docker run -p 3000:3000 simple-node-app

## Jenkins Setup
- Install Jenkins with Docker support
- Add Docker Hub credentials (`docker-hub-repo`)
- Create a pipeline job pointing to this repo
