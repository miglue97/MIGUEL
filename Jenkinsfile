pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "backend-image"
        FRONTEND_IMAGE = "frontend-image"
        MONGO_IMAGE = "mongo-image"
    }

    stages {
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
