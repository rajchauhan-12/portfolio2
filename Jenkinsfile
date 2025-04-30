pipeline {
    agent any
    
    environment {
        // Windows-specific Docker commands
        DOCKER_COMPOSE = 'docker-compose.exe'
        DOCKER = 'docker.exe'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Verify Files') {
            steps {
                script {
                    // Check for required files
                    if (!fileExists('nginx.conf')) {
                        error("nginx.conf file is missing!")
                    }
                    if (!fileExists('docker-compose.yml')) {
                        error("docker-compose.yml file is missing!")
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                bat """
                    ${DOCKER_COMPOSE} down || exit 0
                    ${DOCKER} system prune -f || exit 0
                """
            }
        }
        
        stage('Build & Deploy') {
            steps {
                bat """
                    ${DOCKER_COMPOSE} pull
                    ${DOCKER_COMPOSE} build --no-cache
                    ${DOCKER_COMPOSE} up -d
                """
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    // Add health check for your application
                    def response = bat(returnStdout: true, script: 'curl -s -o nul -w "%{http_code}" http://localhost:80')
                    if (response != "200") {
                        error("Application failed to start properly!")
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed'
        }
        success {
            echo 'Deployment succeeded!'
            // Add notification here
        }
        failure {
            echo 'Deployment failed!'
            // Add notification here
        }
    }
}
