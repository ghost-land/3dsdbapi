const getApiDocsHtml = () => `
<!DOCTYPE html>
<html>
<head>
  <title>3DSDB API Documentation</title>
  <style>
    body { font-family: system-ui; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .endpoint { background: #f5f5f5; padding: 1rem; margin: 1rem 0; border-radius: 4px; }
    .method { color: #2563eb; font-weight: bold; }
    code { background: #e5e7eb; padding: 0.2rem 0.4rem; border-radius: 2px; }
  </style>
</head>
<body>
  <h1>3DSDB API Documentation</h1>
  
  <h2>Database Structure</h2>
  <p>The API serves content from a structured database located at <code>public/db/3ds/</code></p>
  
  <h2>Categories</h2>
  <ul>
    <li>base - Base game content</li>
    <li>dlc - Downloadable content</li>
    <li>dsiware - DSiWare titles</li>
    <li>extras - Additional content</li>
    <li>themes - System themes</li>
    <li>updates - Game updates</li>
    <li>videos - Video content</li>
    <li>virtual-console - Virtual Console titles</li>
  </ul>

  <h2>Endpoints</h2>
  
  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid</code>
    <p>Retrieve title metadata in XML format</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/banner</code>
    <p>Get the title's banner image</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/icon</code>
    <p>Get the title's icon image</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/screen/:num</code>
    <p>Get a specific compiled screenshot</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/screen_u/:num/:screen</code>
    <p>Get an uncompiled screenshot (upper/lower screen)</p>
    <p>Use <code>u</code> for upper screen, <code>l</code> for lower screen</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/screens</code>
    <p>Get a list of all available screenshots</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/thumb/:num</code>
    <p>Get a specific thumbnail</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/:tid/thumbs</code>
    <p>Get a list of all available thumbnails</p>
  </div>

  <div class="endpoint">
    <span class="method">GET</span> <code>/uptime</code>
    <p>Get server uptime</p>
  </div>
</body>
</html>
`;

const getErrorHtml = (status, message, details) => `
<!DOCTYPE html>
<html>
<head>
  <title>${status} - ${message}</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 0 auto; padding: 2rem; text-align: center; }
    .error-code { font-size: 8rem; color: #ef4444; margin: 0; }
    .error-message { font-size: 2rem; color: #1f2937; margin-bottom: 2rem; }
    .details { background: #f5f5f5; padding: 1rem; border-radius: 4px; text-align: left; }
    .suggestion { margin-top: 2rem; color: #4b5563; }
  </style>
</head>
<body>
  <h1 class="error-code">${status}</h1>
  <h2 class="error-message">${message}</h2>
  
  ${details ? `
  <div class="details">
    <h3>Details:</h3>
    <ul>
      ${Object.entries(details).map(([key, value]) => 
        `<li><strong>${key}:</strong> ${Array.isArray(value) ? 
          `<ul>${value.map(item => `<li>${item}</li>`).join('')}</ul>` : 
          value
        }</li>`
      ).join('')}
    </ul>
  </div>
  ` : ''}
  
  <p class="suggestion">
    Need help? Check out our <a href="/">API documentation</a>
  </p>
</body>
</html>
`;

module.exports = { getApiDocsHtml, getErrorHtml };