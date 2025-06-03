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
                    branch: 'main', // o el nombre real de tu rama
                    credentialsId: '9f9979de-139a-446e-84f3-4f01f6461625'
                )
            }
        }

        stage('Build Imágenes') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE -f Dockerfile-backend .'
                sh 'docker build -t $FRONTEND_IMAGE -f Dockerfile-frontend .'
                sh 'docker build -t $MONGO_IMAGE -f Dockerfile-mongodb .'
            }
        }

        stage('Deploy en Minikube') {
            steps {
                sh 'kubectl apply -f mongo-deployment.yaml'
                sh 'kubectl apply -f mongo-service.yaml'

                sh 'kubectl apply -f backend-deployment.yaml'
                sh 'kubectl apply -f backend-service.yaml'

                sh 'kubectl apply -f frontend-deployment.yaml'
                sh 'kubectl apply -f frontend-service.yaml'
            }
        }
    }
}
