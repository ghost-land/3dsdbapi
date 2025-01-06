const getApiDocsHtml = () => `
<!DOCTYPE html>
<html>
<head>
  <title>3DSDB API Documentation</title>
  <style>
    body { 
      font-family: system-ui; 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 1rem;
      overflow-x: hidden;
    }
    @media (min-width: 768px) {
      body {
        padding: 2rem;
      }
    }
    .endpoint-group { margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; }
    .endpoint-group h3 { color: #1f2937; margin-top: 0; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
    .endpoint { background: #f8fafc; padding: 1rem; margin: 1rem 0; border-radius: 4px; }
    .method { color: #2563eb; font-weight: bold; }
    code { 
      background: #e5e7eb; 
      padding: 0.2rem 0.4rem; 
      border-radius: 2px;
      word-break: break-word;
      white-space: pre-wrap;
    }
    details { margin-bottom: 1rem; }
    summary { cursor: pointer; padding: 0.5rem; background: #f8fafc; border-radius: 4px; user-select: none; }
    summary:hover { background: #f1f5f9; }
    .endpoint-details { padding: 1rem; border-left: 3px solid #e2e8f0; margin-left: 1rem; }
    .parameters { margin-top: 0.5rem; }
    .parameter { margin-left: 1rem; }
    .response { margin-top: 0.5rem; }
    .nav-menu { 
      position: static;
      background: white;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    @media (min-width: 1024px) {
      .nav-menu {
        position: fixed;
        top: 1rem;
        right: 1rem;
        margin-bottom: 0;
      }
    }
    .nav-menu ul { 
      list-style: none; 
      padding: 0; 
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    @media (min-width: 1024px) {
      .nav-menu ul {
        flex-direction: column;
      }
    }
    .nav-menu li { 
      margin: 0;
    }
    .nav-menu a { 
      color: #2563eb; 
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: #f8fafc;
      display: block;
    }
    .nav-menu a:hover { 
      background: #e5e7eb;
    }
  </style>
</head>
<body>
  <nav class="nav-menu">
    <h4>Quick Navigation</h4>
    <ul>
      <li><a href="#metadata">Metadata</a></li>
      <li><a href="#media">Media Assets</a></li>
      <li><a href="#screenshots">Screenshots</a></li>
      <li><a href="#thumbnails">Thumbnails</a></li>
      <li><a href="#system">System Info</a></li>
    </ul>
  </nav>

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

  <h2>API Endpoints</h2>
  
  <div id="metadata" class="endpoint-group">
    <h3>Metadata Endpoints</h3>
    <p>Endpoints for retrieving title metadata and specific metadata fields.</p>
    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid</code>
      </summary>
      <div class="endpoint-details">
        <p>Retrieve title metadata in JSON format along with all available media URLs</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JSON object containing title metadata and media URLs
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/meta/:meta</code>
      </summary>
      <div class="endpoint-details">
        <p>Retrieve a specific metadata field</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
          <div class="parameter">
            <code>meta</code> - Metadata field name (e.g., name, description, release_date_on_eshop)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> Single metadata value
        </div>
      </div>
    </details>
  </div>

  <div id="media" class="endpoint-group">
    <h3>Media Asset Endpoints</h3>
    <p>Endpoints for accessing title banners, icons, and other media assets.</p>
    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/banner</code>
      </summary>
      <div class="endpoint-details">
        <p>Get the title's banner image</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JPEG image file
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/icon</code>
      </summary>
      <div class="endpoint-details">
        <p>Get the title's icon image</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JPEG image file
        </div>
      </div>
    </details>
  </div>

  <div id="screenshots" class="endpoint-group">
    <h3>Screenshot Endpoints</h3>
    <p>Endpoints for accessing both compiled and uncompiled screenshots.</p>
    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/screen/:num</code>
      </summary>
      <div class="endpoint-details">
        <p>Get a specific compiled screenshot</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
          <div class="parameter">
            <code>num</code> - Screenshot number
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JPEG image file
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/screen_u</code>
      </summary>
      <div class="endpoint-details">
        <p>Get a list of all available uncompiled screenshots (upper and lower screens)</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JSON object containing lists of upper and lower screen screenshots
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/screen_u/:num/:screen</code>
      </summary>
      <div class="endpoint-details">
        <p>Get an uncompiled screenshot (upper/lower screen)</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
          <div class="parameter">
            <code>num</code> - Screenshot number
          </div>
          <div class="parameter">
            <code>screen</code> - Screen type (<code>u</code> for upper, <code>l</code> for lower)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JPEG image file
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/screens</code>
      </summary>
      <div class="endpoint-details">
        <p>Get a list of all available screenshots</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JSON object containing screenshot URLs and count
        </div>
      </div>
    </details>
  </div>

  <div id="thumbnails" class="endpoint-group">
    <h3>Thumbnail Endpoints</h3>
    <p>Endpoints for accessing screenshot thumbnails.</p>
    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/thumb/:num</code>
      </summary>
      <div class="endpoint-details">
        <p>Get a specific thumbnail</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
          <div class="parameter">
            <code>num</code> - Thumbnail number
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JPEG image file
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/thumbs</code>
      </summary>
      <div class="endpoint-details">
        <p>Get a list of all available thumbnails</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JSON object containing thumbnail URLs and count
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/:tid/media</code>
      </summary>
      <div class="endpoint-details">
        <p>Get a comprehensive list of all available media for a title</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>tid</code> - Title ID (16-character hexadecimal)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JSON object containing all media URLs (banner, icon, screenshots, thumbnails)
        </div>
      </div>
    </details>
  </div>

  <div id="system" class="endpoint-group">
    <h3>System Information Endpoints</h3>
    <p>Endpoints for retrieving system-wide information and statistics.</p>
    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/uptime</code>
      </summary>
      <div class="endpoint-details">
        <p>Get server uptime information</p>
        <div class="response">
          <strong>Response:</strong> JSON object containing server uptime in a human-readable format
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/stats</code>
      </summary>
      <div class="endpoint-details">
        <p>Get statistics about titles in each category</p>
        <div class="response">
          <strong>Response:</strong> JSON object containing title counts per category and total
        </div>
      </div>
    </details>

    <details>
      <summary class="endpoint">
        <span class="method">GET</span> <code>/category/:category</code>
      </summary>
      <div class="endpoint-details">
        <p>List all TIDs in a specific category</p>
        <div class="parameters">
          <strong>Parameters:</strong>
          <div class="parameter">
            <code>category</code> - Category name (e.g., base, dlc, dsiware, etc.)
          </div>
        </div>
        <div class="response">
          <strong>Response:</strong> JSON object containing category name, title count, and list of TIDs
        </div>
      </div>
    </details>
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
    body { 
      font-family: system-ui; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 1rem; 
      text-align: center;
    }
    @media (min-width: 768px) {
      body {
        padding: 2rem;
      }
    }
    .error-code { 
      font-size: 4rem; 
      color: #ef4444; 
      margin: 0;
      line-height: 1;
    }
    @media (min-width: 768px) {
      .error-code {
        font-size: 8rem;
      }
    }
    .error-message { 
      font-size: 1.5rem; 
      color: #1f2937; 
      margin: 1rem 0 2rem;
      line-height: 1.2;
    }
    @media (min-width: 768px) {
      .error-message {
        font-size: 2rem;
      }
    }
    .details { 
      background: #f5f5f5; 
      padding: 1rem; 
      border-radius: 8px; 
      text-align: left;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 1rem 0;
    }
    .details h3 {
      margin-top: 0;
      color: #1f2937;
      font-size: 1.25rem;
    }
    .details ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    .details li {
      margin: 0.5rem 0;
      line-height: 1.4;
    }
    .details li ul {
      margin-top: 0.5rem;
    }
    .suggestion { 
      margin-top: 2rem; 
      color: #4b5563;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .suggestion a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }
    .suggestion a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1 class="error-code">${status}</h1>
  <h2 class="error-message">${message}</h2>
  
  ${details ? `
  <div class="details">
    <h3>What happened?</h3>
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
    💡 Need help? Check out our <a href="/">API documentation</a> for the correct endpoints and usage.
  </p>
</body>
</html>
`;

module.exports = { getApiDocsHtml, getErrorHtml };