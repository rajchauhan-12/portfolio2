pipeline {
    agent any

    environment {
        // Set Git to temporarily ignore SSL verification (remove after certificate fix)
        GIT_SSL_NO_VERIFY = 'true'
        // Docker compose executable path
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Verify Environment') {
            steps {
                script {
                    // Check if Docker is installed and running
                    bat 'docker --version || echo "Docker not found" && exit 1'
                    // Check if docker-compose is available
                    bat 'docker-compose --version || echo "docker-compose not found" && exit 1'
                }
            }
        }

        stage('Clone Repository') {
            steps {
                retry(3) {
                    script {
                        // Clone with error handling and retries
                        try {
                            git branch: 'main', 
                                 url: 'https://github.com/rajchauhan-12/portfolio2.git',
                                 credentialsId: 'github-credentials'  // Add your credentials ID
                        } catch (Exception e) {
                            echo "Git clone failed: ${e.getMessage()}"
                            // Fallback to SSH if HTTPS fails
                            git branch: 'main', 
                                 url: 'git@github.com:rajchauhan-12/portfolio2.git',
                                 credentialsId: 'github-ssh-credentials'
                        }
                    }
                }
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    // Cleanup any existing containers
                    bat 'docker system prune -f || exit 0'
                    
                    // Build and deploy with error handling
                    try {
                        bat """
                            ${DOCKER_COMPOSE} down || exit 0
                            ${DOCKER_COMPOSE} build --no-cache
                            ${DOCKER_COMPOSE} up -d
                        """
                    } catch (Exception e) {
                        echo "Deployment failed: ${e.getMessage()}"
                        // Get container logs for debugging
                        bat 'docker-compose logs --no-color || true'
                        error('Deployment failed - see logs above')
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Wait for container to start
                    sleep(time: 15, unit: 'SECONDS')
                    
                    // Check if container is running
                    def containerStatus = bat(returnStdout: true, script: 'docker inspect --format="{{.State.Status}}" portfolio-react-portfolio-1').trim()
                    if (containerStatus != 'running') {
                        error("Container is not running! Status: ${containerStatus}")
                    }
                    
                    // Optional: HTTP health check
                    def httpStatus = bat(returnStdout: true, script: 'curl -s -o nul -w "%{http_code}" http://localhost:80 || echo "500"').trim()
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
            // Clean up resources
            bat 'docker-compose down || true'
        }
        success {
            echo 'Deployment succeeded!'
            // Add notifications here (Slack, email, etc.)
        }
        failure {
            echo 'Deployment failed!'
            // Add failure notifications here
            // Get detailed logs for debugging
            bat 'docker-compose logs --no-color || true'
            bat 'docker ps -a || true'
        }
    }
}
