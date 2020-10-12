# Simple Document Management System - Backend
Simple DMS has the following
New Users can be created & login and can do the following
    * Users can create files, folders
    * Move files from one folder to another

Should have the following installed
1) docker

## Endpoints
    * Create a User
        - endpoint: /dms/user/add
    * Sign in
        - endpoint: /dms/user/login
    * View all Files/Folder
        - endpoint: /dms/folders-files/list/{user_id}
    * View all Files of a specific Folder
        - endpoint: /dms/{user_id}/files/list/{folder_id}
    * Create File 
        - endpoint:/dms/file/add
    * Create Folder
        - endpoint:/dms/folder/add	
    * Move File
        - endpoint:/dms/file/move

## Usage
    * Make sure docker is up and running
    * docker-compose up
    * Open http://localhost:3000/api-docs to view the APIs 

## License
[MIT](https://choosealicense.com/licenses/mit/)
