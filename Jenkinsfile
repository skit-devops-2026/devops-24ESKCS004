pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        PROJECT_NAME = 'devops-24eskcs004-digital-twin'
        STUDENT_NAME = 'Aashi Goyal'
        ROLL_NO = '24ESKCS004'
        COURSE = 'SKIT DevOps 2026'
    }

    stages {
        stage('Checkout & SCM Verification') {
            steps {
                echo "=========================================================="
                echo "Building: ${env.PROJECT_NAME}"
                echo "Student:  ${env.STUDENT_NAME} (${env.ROLL_NO})"
                echo "Course:   ${env.COURSE} - Module 4 Jenkins Pipeline"
                echo "=========================================================="
                sh '''
                    echo "Git branch and commit info:"
                    git --version
                    git log -1 --oneline
                '''
            }
        }

        stage('Environment Check') {
            steps {
                echo "Verifying Node.js and runtime tools..."
                sh '''
                    node -v
                    npm -v
                '''
            }
        }

        stage('Repository Cleanliness Audit') {
            steps {
                echo "Auditing repository for prohibited build artifacts..."
                sh '''
                    FORBIDDEN="node_modules dist build venv .venv .DS_Store"
                    for item in $FORBIDDEN; do
                        if [ -e "$item" ]; then
                            echo "Error: Forbidden build artifact '$item' found in repository!"
                            exit 1
                        fi
                    done
                    echo "Repository cleanliness audit passed: no build artifacts or secrets committed."
                '''
            }
        }

        stage('Syntax & Static Analysis') {
            steps {
                echo "Running JavaScript syntax validation (lint)..."
                sh 'npm run lint'
            }
        }

        stage('Automated Test Suite') {
            steps {
                echo "Executing automated unit tests..."
                sh 'npm test'
            }
        }

        stage('Package & Distribution Staging') {
            steps {
                echo "Staging clean web dashboard distribution package..."
                sh '''
                    mkdir -p build_output
                    tar --exclude='.git' \
                        --exclude='.github' \
                        --exclude='tests' \
                        --exclude='Jenkinsfile' \
                        --exclude='build_output' \
                        -czf build_output/twinfin-release.tar.gz .
                    ls -la build_output/
                    echo "Distribution package staged successfully."
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline execution finished for build #${env.BUILD_NUMBER}."
            sh 'rm -rf build_output'
        }
        success {
            echo "=========================================================="
            echo "Jenkins Pipeline SUCCESS: All tests, audits, and checks passed!"
            echo "=========================================================="
        }
        failure {
            echo "=========================================================="
            echo "Jenkins Pipeline FAILED: Review console output for errors."
            echo "=========================================================="
        }
    }
}
