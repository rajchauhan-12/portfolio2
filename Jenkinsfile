pipeline{
	agent any
	stages{
	   stage('clone Repository'){
		steps{
		   git 'paste your git repo where your compose file is saved.git'
		   }
		}
	  stage('Build & deploy'){
		steps{
		   script{
		       bat 'docker-compose down || true'
		       bat 'docker-compose pull'
		       bat 'docker-compose up -d'
                    }
                 }
            }
        }
    post{
	always{
	    echo 'Pipeline finished'
	    }
         }
}	