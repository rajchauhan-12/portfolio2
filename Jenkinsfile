pipeline {
    agent any
    
    environment {
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
                    ${DOCKER_COMPOSE} build --no-cache
                    ${DOCKER_COMPOSE} up -d
                """
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    // Wait for container to start
                    sleep(time: 10, unit: 'SECONDS')
                    
                    // Check if container is running
                    def status = bat(returnStdout: true, script: "${DOCKER} inspect -f '{{.State.Status}}' portfolio-react-portfolio-1").trim()
                    if (status != 'running') {
                        error("Container is not running! Status: ${status}")
                    }
                    
                    // Optional: Check HTTP response
                    // def response = bat(returnStdout: true, script: "curl -s -o nul -w \"%{http_code}\" http://localhost:80")
                    // if (response != "200") {
                    //     error("Application failed to respond with HTTP 200")
                    // }
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
            // Add notification here (email, Slack, etc.)
        }
        failure {
            echo 'Deployment failed!'
            // Add notification here
        }
    }
}
