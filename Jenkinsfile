pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo "Hello World"'
                sh '''
                    echo "Multiline shell steps works too"
                    ls -hal
                    node --version
                    npm i
                    ./start.sh
                '''
            }
        }
    }
}