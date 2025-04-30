pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                     url: 'https://github.com/rajchauhan-12/portfolio2.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    // Clean up
                    bat 'docker system prune -f || exit 0'
                    bat '${DOCKER_COMPOSE} down || exit 0'
                    
                    // Build and deploy
                    bat '${DOCKER_COMPOSE} build --no-cache'
                    bat '${DOCKER_COMPOSE} up -d'
                }
            }
        }
        
        stage('Verify') {
            steps {
                script {
                    sleep(time: 15, unit: 'SECONDS')
                    
                    // Check container status
                    def status = bat(returnStdout: true, 
                                  script: 'docker inspect -f "{{.State.Status}}" react-portfolio').trim()
                    if (status != 'running') {
                        error("Container is not running! Status: ${status}")
                    }
                    
                    // HTTP health check
                    def httpStatus = bat(returnStdout: true, 
                                       script: 'curl -s -o nul -w "%{http_code}" http://localhost:3000 || echo "500"').trim()
                    if (httpStatus != '200') {
                        error("Health check failed - HTTP ${httpStatus}")
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
        }
        failure {
            echo 'Pipeline failed - collecting diagnostics'
            bat 'docker ps -a'
            bat 'docker-compose logs --no-color || true'
        }
    }
}
