
# Project Title
Visa Navigator



## Live URL
[https://visa-navigator-244e2.web.app/](#) 

## Key Features
**Features of the Backend API:**
User Authentication Integration:
Secures user data by integrating Firebase authentication to identify and fetch user-specific visa applications.

**CRUD Operations for Visa Management:**
Provides endpoints to create, read, update, and delete visa-related data, ensuring full functionality for managing visa applications.

**Dynamic Filtering by Email:**
Returns visa applications for a specific user based on their email address for a personalized experience.

**Efficient Data Storage:**
Utilizes MongoDB to store and retrieve data such as user profiles, visa information, and applied visa records.

**Error Handling and Validation:**
Includes robust error handling to ensure the API responds with meaningful messages for invalid requests or server issues.

##Technologies Used:
- Backend Framework: Node.js with Express.js
- Database: MongoDB (using the official mongodb driver)
- Authentication: Firebase Authentication
- Cors: Enabled for seamless communication with the client.
- Environment Variables: Secured sensitive information like database URIs using dotenv.

**API Endpoints:**
GET /visas
Fetch all visa data.

**GET /latest-visa**
Retrieve the latest visas (sorted by creation date).

**GET /added-visa?email={userEmail}**
Fetch visas added by a specific user based on their email.

**POST /visas**
Add a new visa entry.

**DELETE /application/:id**
Delete an applied visa by its unique ID.

## Installation
Make sure you have the following installed on your machine:

Node.js (>=12.x)
npm or yarn

```bash
  git clone https://github.com/your-username/visa-navigator-server.git


```
```bash
  cd visa-navigator



```
```bash
  npm install
```
```bash
  MONGODB_URI=your_mongodb_connection_string
PORT=3000


```
```bash
  npm run dev

```



## Deployment

To deploy this project run

```bash
  npm run deploy
```

