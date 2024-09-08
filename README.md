# CIVICVOICE

#Demo Video of sorting of Blog according to like count.

https://github.com/user-attachments/assets/507f9e5a-322e-45c8-9683-e49614b47a55


![image](https://github.com/user-attachments/assets/a1c2439b-52d9-4f8a-8099-b163ecce2944)


CivicVoice website is a website where you can raise your voice by writting a blog ,Having more like to your Blog will prioritize it and will be on the top.

It is a MERN (MongoDB, Express.js, React, Node.js) stack application that empowers users to create, view, and search for blog posts. It incorporates robust user authentication using bcrypt, JWT, and cookies, allowing users to log in, register, and engage with the community through comments. Only the author of a post has the authority to update or delete it.


## Installation

To set up CivicVoice locally, follow these comprehensive steps:

1. **Clone the repository:**

   ```bash
   git clone repository link

2.  Install dependencies for both the client and server:

    -   Navigate to the `client` directory and install client dependencies:

        `cd client
        npm install`

    -   Move back to the root directory and install server dependencies:

        `cd ..
        cd server
        npm install`

2.  Configure Cloudinary for image storage:

    -   Sign up for a [Cloudinary] account.

    -   Retrieve your Cloudinary API key, API secret, and cloud name.

    -   Create a `.env` file in the `server` directory.

    -   Add the following variables to the `.env` file:



        `CLOUDINARY_CLOUD_NAME=your_cloud_name`
        
        `CLOUDINARY_API_KEY=your_api_key`
        
        `CLOUDINARY_API_SECRET=your_api_secret`

    Ensure that you replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials.

3.  Run the application:

    -   In the `client` directory:

        `cd client
        npm start`

    -   In the `server` directory:

        `cd ..
        cd server
        node app.js`



This setup process covers cloning the repository, installing dependencies, and configuring Cloudinary for image storage. Make sure to follow each step carefully to ensure a smooth installation process. If you encounter any issues, refer to the documentation or seek help from the community.

# Features


## User Authentication:

-   Secure user authentication using bcrypt, JWT, and cookies.
-   Login and registration functionalities.

## Post Management:

-   Create, update, and delete posts using React Quill for an enhanced text editor experience.
-   Upload and display images with Cloudinary integration.
-   View and search for posts.

## Comment System:

-   Users can comment on posts.
-   Commenting requires user authentication.

## Author Pages:

-   Individual pages for each author, showcasing their posts.

# User Authentication


It uses bcrypt for password hashing, JWT for secure user authentication, and cookies for a seamless user experience. To contribute, familiarize yourself with these technologies and the authentication flow in the application.




