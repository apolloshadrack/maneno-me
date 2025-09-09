pipeline {
    agent any
    environment {
        PM2_HOME = '/etc/pm2'
    }
    stages {
        stage('Install dependencies - Frontend') {
            steps {
                sh 'cd frontend && pnpm install --no-frozen-lockfile'
            }
        }
        stage('Build - Frontend') {
            steps {
                // withCredentials([file(credentialsId: 'maneno-frontend-env', variable: 'FRONTEND_VARIABLES')]) {
                //     sh '''
                //      touch .env
                //      cat "$FRONTEND_VARIABLES" > .env
                //      pnpm build
                //     '''
                // }
                sh 'cd frontend && pnpm build:no-lint'
            }
        }
        stage('Deploy - Frontend') {
            steps {
                sh 'mkdir -p /apps/maneno/client'
                sh 'cd frontend && cp -r dist/ ecosystem.config.cjs vite.config.ts package.json /apps/maneno/client'
                sh 'rm -rf /apps/maneno/client/node_modules'
                sh 'cd frontend && mv node_modules /apps/maneno/client'
            }
        }
        stage('Restart Services - Frontend') {
            steps {
                sh '''
                    if pm2 id maneno-frontend > /dev/null 2>&1; then
                        echo "Restarting existing maneno-frontend service"
                        pm2 restart /apps/maneno/client/ecosystem.config.cjs
                    else
                        echo "Starting new maneno-frontend service"
                        pm2 start /apps/maneno/client/ecosystem.config.cjs
                    fi
                    pm2 save
                '''
            }
        }
        // stage('Install dependencies - Backend') {
        //     steps {
        //         sh 'cd backend && pnpm install --no-frozen-lockfile'
        //     }
        // }
        // stage('Build - Backend') {
        //     steps {
        //         withCredentials([file(credentialsId: 'maneno-backend-env', variable: 'BACKEND_VARIABLES')]) {
        //             sh '''
        //                 cd backend
        //                 touch .env
        //                 cat "$BACKEND_VARIABLES" > .env
        //                 if [ -f .env ]; then
        //                     echo ".env file created successfully"
        //                 else
        //                     echo "Failed to create .env file" >&2
        //                     exit 1
        //                 fi
        //                 pnpm build
        //             '''
        //         }
        //     }
        // }
        // stage('Deploy - Backend') {
        //     steps {
        //         sh 'mkdir -p /apps/maneno/server'
        //         sh 'cd backend && cp -r dist/ ecosystem.config.cjs package.json .env /apps/maneno/server'
        //         sh 'rm -rf /apps/maneno/server/node_modules'
        //         sh 'cd backend && mv node_modules /apps/maneno/server'
        //     }
        // }
        // stage('Restart Services - Backend') {
        //     steps {
        //         sh '''
        //             if pm2 id maneno-backend > /dev/null 2>&1; then
        //                 echo "Restarting existing maneno-backend service"
        //                 pm2 restart /apps/maneno/server/ecosystem.config.cjs
        //             else
        //                 echo "Starting new maneno-backend service"
        //                 pm2 start /apps/maneno/server/ecosystem.config.cjs
        //             fi
        //             pm2 save
        //         '''
        //     }
        // }
    }
    post {
        success {
            echo 'Deployment completed successfully!'
            sh '''
                pm2 startup || true
                echo "If PM2 startup needs manual configuration, copy and run the command above as root"
                pm2 save
            '''
        }
        failure {
            echo 'Deployment failed.'
        }
        unstable {
            echo 'Deployment was unstable.'
        }
    }
}