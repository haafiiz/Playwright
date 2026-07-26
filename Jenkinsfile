pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Git Information') {
            steps {
                sh '''
                    echo "Current Branch:"
                    git branch

                    echo "Current Commit:"
                    git rev-parse HEAD

                    echo "Latest Commit:"
                    git log -1 --oneline
                '''
            }
        }

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
            // Publish Playwright HTML Report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            // Publish JUnit Report
            junit 'test-results/results.xml'

            // Archive reports
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', fingerprint: true
        }
    }
}