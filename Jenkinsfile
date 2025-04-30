pipeline {
    agent any
    
    environment {
        DOCKER_CONTENT_TRUST = '0'  // Temporary workaround
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
                    // Clean up existing containers
                    bat 'docker system prune -f || exit 0'
                    
                    try {
                        // Build with no cache
                        bat """
                            ${DOCKER_COMPOSE} down || exit 0
                            ${DOCKER_COMPOSE} build --no-cache
                            ${DOCKER_COMPOSE} up -d
                        """
                    } catch (Exception e) {
                        echo "Build failed: ${e.getMessage()}"
                        // Get container logs for debugging
                        bat 'docker-compose logs --no-color || true'
                        error('Build failed - see logs above')
                    }
                }
            }
        }
        
        stage('Verify') {
            steps {
                script {
                    // Wait for services to start
                    sleep(time: 15, unit: 'SECONDS')
                    
                    // Check container status
                    def status = bat(returnStdout: true, 
                                  script: 'docker inspect -f "{{.State.Status}}" portfolio-react-portfolio-1').trim()
                    if (status != 'running') {
                        error("Container is not running! Status: ${status}")
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
