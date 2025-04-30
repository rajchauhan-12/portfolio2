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
                    
                    // Build React app
                    bat 'npm install && npm run build'
                    
                    // Deploy
                    bat '${DOCKER_COMPOSE} up -d --build'
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
                        error("Health check failed - HTTP ${httpStatus}. Check nginx configuration.")
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
            // Clean up (optional)
            // bat '${DOCKER_COMPOSE} down || true'
        }
        failure {
            echo 'Pipeline failed - collecting diagnostics'
            bat 'docker ps -a'
            bat 'docker inspect react-portfolio'
            bat 'docker logs react-portfolio'
            bat 'type nginx.conf'  // Verify nginx config file contents
        }
    }
}
