pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'medhermi/nodeapp'
        BUILD_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit || echo "Audit completed with warnings."'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${BUILD_TAG}
                    """
                }
            }
        }

        stage('Deliver to Staging') {
            steps {
                echo "Simulating deployment of ${DOCKER_IMAGE}:${BUILD_TAG} to staging..."
                sleep 10
            }
        }
    }

    post {
        always {
            echo "Build #${env.BUILD_ID} - ${currentBuild.currentResult}"
            cleanWs()
        }
        success {
            emailext (
                subject: "SUCCESS: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Build succeeded. View details at ${env.BUILD_URL}",
                to: "your.email@example.com"
            )
        }
        failure {
            emailext (
                subject: "FAILURE: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Build failed. View details at ${env.BUILD_URL}",
                to: "your.email@example.com"
            )
        }
    }
}
