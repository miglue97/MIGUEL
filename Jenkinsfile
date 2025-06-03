pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "backend-image"
        FRONTEND_IMAGE = "frontend-image"
        MONGO_IMAGE = "mongo-image"
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                git(
                    url: 'https://github.com/miglue97/MIGUEL.git',
                    branch: 'master',
                    credentialsId: '9f9979de-139a-446e-84f3-4f01f6461625'
                )
            }
        }

        stage('Build Imágenes') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE% -f Dockerfile-backend .'
                bat 'docker build -t %FRONTEND_IMAGE% -f Dockerfile-frontend .'
                bat 'docker build -t %MONGO_IMAGE% -f Dockerfile-mongodb .'
            }
        }
        
        stage('Deploy en Minikube') {
            steps {
                bat '''
                set KUBECONFIG=C:\\Users\\Migue\\.kube\\config
                kubectl apply -f mongo-deployment.yaml
                kubectl apply -f mongo-service.yaml
                kubectl apply -f backend-deployment.yaml
                kubectl apply -f backend-service.yaml
                kubectl apply -f frontend-deployment.yaml
                kubectl apply -f frontend-service.yaml
                '''
            }
        }
    }
}
