# Overview of the Project
The <b>Cuisine Code </b> platform is designed to showcase the <b> Food Ordering Management System </b> developed for students and canteen owners. The system allows students to conveniently place orders through the website, eliminating the need to wait in long queues. Additionally, it provides canteen owners with real-time, in-depth sales analysis through a database seamlessly integrated with Power BI. This dual-purpose system enhances user experience for students and supports data-driven decision-making for canteen management.

# Contributors:
<p>Nandan Upadhyaya</p>
<p>Ankith Hebbar </p>
<p>Sinchan A </p>
<p>Tejas P Naik </p>

# Tech Stack
<p><b>Frontend:</b>  React, CSS </p>
<p><b>Backend: </b> Node, Express</p>
<p><b>Database:</b>  Neon DB (Neon DB is a fully managed, serverless, and cloud-native implementation of PostgreSQL, designed to deliver high scalability, seamless integration, and optimal performance for modern 
          application development)</p>

# Additional Libraries Installed
<p><b>react-toastify: </b> A React library for creating customizable, lightweight, and stylish toast notifications.</p>
<p><b>react-icons:  </b> A library providing a collection of popular icons for easy integration into React applications.</p>
<p><b>pg:  </b> A Node.js library for interacting with PostgreSQL databases, offering a robust and feature-rich API.</p>
<p><b>dotenv:  </b> A module for loading environment variables from a .env file into process.env, enhancing application security and configurability.</p>
<p><b>jspdf:  </b> A JavaScript library for generating PDF documents directly in the browser or Node.js environments.</p>
<p><b>axios:  </b> A promise-based HTTP client for making requests to servers, supporting RESTful APIs and asynchronous operations in both browser and Node.js environments.</p>
<p><b>cors:  </b> A Node.js package that enables Cross-Origin Resource Sharing (CORS), allowing servers to handle requests from different origins securely and flexibly.</p>
<p><b>concurrently: </b> A Node.js package that allows to run multiple processes, such as  frontend and backend servers, simultaneously in a single terminal window, streamlining development workflows.</p>
<p><b>nodemon: </b> A Node.js utility that automatically restarts the server whenever changes are detected in the source code, enhancing developer productivity by eliminating the need for manual restarts.</p>

# Database structure
<p><b> Entites and Attributes </b></p>
<p><b> customer : custid (Primary Key), custname, contactno, noofvisits </b></p>
<p><b> orders : orderid (Primary Key), custid (Foreign Key), time_of_order </b></p>
<p><b> order_items : itemid (Primary Key), orderid (Foreign Key), custid (Foreign Key), itemname, quantity, price, foodtype (Veg/Non-Veg/Drinks) </b></p>
<p><b> payment : paymentid (Primary Key), custid (Foreign Key), orderid (Foreign Key), paymenttype, paymentstatus, paymentdate, grandtotal  </b></p>

# Features:

# How to run the application
<p> Run the command </p>
<p> <b>npm run dev</b> (It will restart the frontend and backend server simultaneously)</p>
<p>or</p>
<p><b>npm start </b> (It will only start the frontend server)</p>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

This project is under development!!!
