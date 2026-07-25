pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                    npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    rm -rf playwright-report test-results
                    npx playwright test
                '''
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}