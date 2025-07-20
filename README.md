# API Explorer

API Explorer is a modern, dynamic, and fully responsive documentation viewer for your REST APIs. Built with Next.js and ShadCN UI, it parses a `api-docs.json` file to generate a beautiful and user-friendly interface for exploring your API services and endpoints.

![API Explorer Screenshot](https://placehold.co/800x500.png)

## Features

- **Dynamic Documentation:** Generates the entire documentation from a single `api-docs.json` file.
- **Service Navigation:** Dynamically creates a sidebar menu based on the services defined in your API documentation.
- **Real-time Search:** Instantly filters services in the sidebar as you type.
- **Responsive Design:** A mobile-first design ensures the documentation is accessible and easy to use on any device, from desktops to smartphones.
- **Copyable Deep Links:** Each service section has a copy-to-clipboard link (`#`) for easy sharing and direct navigation.
- **Syntax Highlighting:** Displays example responses in a clean, formatted, and easy-to-read code block.
- **HTTP Method Badges:** Visually distinguishes HTTP methods (GET, POST, PUT, DELETE) with color-coded badges.
- **Light & Dark Mode:** Includes a theme toggle for user preference.
- **Configurable Example:** An optional toggle allows users to switch between your live API documentation and a built-in example file, which serves as a template.

---

## The `api-docs.json` Structure

To use the API Explorer, you need to create a `api-docs.json` file in the `public/` directory of the project. The application parses this file to render the documentation.

The application also supports a fallback/template file named `public/api-docs-example.json`. You can use the "Show Example" switch in the UI (if enabled) to see a comprehensive example of the JSON structure.

### Root Object

The main JSON object has the following properties:

| Key                 | Type    | Required | Description                                                                                    |
| ------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `projectName`       | String  | Yes      | The name of your project, displayed prominently in the sidebar.                                |
| `version`           | String  | Yes      | The current version of your API.                                                               |
| `showExampleToggle` | Boolean | No       | If `true`, a switch appears in the UI to toggle between `api-docs.json` and `api-docs-example.json`. |
| `services`          | Array   | Yes      | An array of `Service` objects.                                                                 |

### `Service` Object

Each object inside the `services` array represents a group of related endpoints.

| Key           | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `id`          | String  | Yes      | A unique, URL-friendly identifier (e.g., `user-service`).   |
| `name`        | String  | Yes      | The display name of the service (e.g., "User Management").  |
| `description` | String  | Yes      | A brief description of what the service does.               |
| `endpoints`   | Array   | Yes      | An array of `Endpoint` objects belonging to this service.   |

### `Endpoint` Object

Each object inside the `endpoints` array represents a single API endpoint.

| Key               | Type            | Required | Description                                                            |
| ----------------- | --------------- | -------- | ---------------------------------------------------------------------- |
| `method`          | String          | Yes      | The HTTP method (`GET`, `POST`, `PUT`, `DELETE`).                      |
| `route`           | String          | Yes      | The API route, including path parameters (e.g., `/users/{userId}`).    |
| `summary`         | String          | Yes      | A short, one-line summary of the endpoint's function.                  |
| `description`     | String          | Yes      | A more detailed description of the endpoint.                           |
| `parameters`      | Array           | Yes      | An array of `Parameter` objects. Can be empty.                         |
| `successResponse` | `Response` Object | Yes      | An object describing a typical successful response.                    |
| `errorResponse`   | `Response` Object | Yes      | An object describing a typical error response.                         |

### `Parameter` Object

| Key           | Type   | Required | Description                                                                      |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------- |
| `name`        | String | Yes      | The name of the parameter.                                                       |
| `in`          | String | Yes      | The location of the parameter: `path`, `query`, or `body`.                       |
| `type`        | String | Yes      | The data type of the parameter (e.g., `String`, `Integer`, `Object`).            |
| `required`    | Boolean| Yes      | Whether the parameter is mandatory.                                              |
| `description` | String | Yes      | A description of the parameter and its purpose.                                  |

### `Response` Object

| Key    | Type   | Required | Description                                                                      |
| ------ | ------ | -------- | -------------------------------------------------------------------------------- |
| `code` | Number | Yes      | The HTTP status code for the response (e.g., `200`, `404`).                      |
| `body` | Object | Yes      | A JSON object representing the example response body. Can be an empty object `{}`. |

---

## Deployment (Static Export for Apache)

This Next.js application can be exported as a static HTML, CSS, and JavaScript site, which is ideal for hosting on a traditional web server like Apache without needing a Node.js environment.

### Step 1: Build the Static Site

Run the build command. Next.js will automatically detect the static export configuration and generate the output in a folder named `out`. A placeholder `api-docs.json` should exist in the `public` folder during this step, but it can be changed later.

```bash
npm run build
```

This command creates an `out` directory containing all the necessary HTML, CSS, and JavaScript files for your application.

### Step 2: Deploy to Apache

Upload the **contents** of the `out` directory to the document root of your Apache server (e.g., `/var/www/html`).

```
/var/www/html/
├── _next/
├── 404.html
├── api-docs.json       <-- YOUR API DOCS FILE GOES HERE
├── api-docs-example.json
├── favicon.ico
└── index.html
```

### Step 3: Manage Your API Documentation

**This is the key advantage:** You can update your `api-docs.json` file directly on the server at any time **without needing to recompile the application**.

Simply replace the `api-docs.json` file in your Apache document root with the new version. The next time a user loads the API Explorer, it will automatically fetch and display the updated content.

### Step 4: Configure Apache for SPA Routing

Since this is a Single-Page Application (SPA), you need to configure Apache to redirect all routing requests to `index.html`. This allows Next.js's client-side router to handle deep links (e.g., `your-domain.com/#user-service`).

1.  **Enable the rewrite module:**
    ```bash
    sudo a2enmod rewrite
    sudo systemctl restart apache2
    ```

2.  **Create or edit your `.htaccess` file** in your document root (`/var/www/html`) with the following content:

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>
    ```
    
    Alternatively, you can add this logic directly to your Virtual Host configuration file for better performance.

Your API Explorer is now live and being served directly by Apache.
