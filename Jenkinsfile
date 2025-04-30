pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Replace this with your actual GitHub repo URL
                git branch: 'main', url: 'https://github.com/rajchauhan-12/portfolio2.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    // Safely stop any running containers
                    bat 'docker-compose down || exit 0'
                    // Pull latest images if needed
                    bat 'docker-compose pull'
                    // Start containers in detached mode
                    bat 'docker-compose up -d --build'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
