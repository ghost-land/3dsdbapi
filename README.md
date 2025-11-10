# ⚠️ Deprecated Project

> **This repository is now archived.**  
> The 3DSDB API is no longer maintained, all its functionality has been migrated and improved under the **`/citra`** section of **[Nlib API](https://github.com/ghost-land/nlib-api)**.  
> Please use the new API for any future development.

___

# 3DSDB API

A RESTful API for accessing 3DS game metadata, screenshots, and media assets.   

![Version](https://img.shields.io/badge/version-1.0.2-brightgreen.svg)
![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)

## Features

- Access game metadata in XML format
- Get specific metadata fields individually
- Retrieve game banners, icons, and screenshots
- Get both compiled and uncompiled (upper/lower screen) screenshots
- Access thumbnail images
- Support for multiple content categories (base games, DLC, DSiWare, etc.)

## Database Structure

```
public/db/3ds/
├── base/           # Base games
├── dlc/            # Downloadable content
├── dsiware/        # DSiWare titles
├── extras/         # Additional content
├── themes/         # System themes
├── updates/        # Game updates
├── videos/         # Video content
└── virtual-console/ # Virtual Console titles
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /:tid` | Get title metadata (JSON) with media URLs |
| `GET /:tid/meta/:meta` | Get specific metadata field |
| `GET /:tid/banner` | Get title banner image |
| `GET /:tid/icon` | Get title icon image |
| `GET /:tid/screen/:num` | Get compiled screenshot |
| `GET /:tid/screen_u` | List all uncompiled screenshots |
| `GET /:tid/screen_u/:num/:screen` | Get uncompiled screenshot (u/l) |
| `GET /:tid/screens` | List all available screenshots |
| `GET /:tid/thumb/:num` | Get specific thumbnail |
| `GET /:tid/thumbs` | List all available thumbnails |
| `GET /:tid/media` | List all available media |
| `GET /uptime` | Get server uptime |
| `GET /stats` | Get statistics about titles in each category |
| `GET /category/:category` | List all TIDs in a specific category |

## API Response Examples

<details>
<summary><strong>Title Metadata Response</strong></summary>

```json
{
  "tid": "0004000000163200",
  "name": "Fullblox™",
  "formal_name": "Fullblox™",
  "description": "Free to Start; Free to Discover!...",
  "release_date_on_eshop": "2015-05-14",
  "product_code": "CTR-N-KAAP",
  "platform_name": "Nintendo 3DS (Download)",
  "region": "Europe",
  "genres": ["Puzzle"],
  "features": [
    "Displays 3D Visuals",
    "Supports StreetPass",
    "Supports SpotPass",
    "Nintendo Network"
  ],
  "languages": [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian"
  ],
  "rating_system": {
    "name": "PEGI",
    "age": "3"
  },
  "media": {
    "banner": "http://api.example.com/0004000000163200/banner",
    "icon": "http://api.example.com/0004000000163200/icon",
    "screenshots": {
      "compiled": [
        "http://api.example.com/0004000000163200/screen/1",
        "http://api.example.com/0004000000163200/screen/2"
      ],
      "uncompiled": {
        "upper": [
          "http://api.example.com/0004000000163200/screen_u/1/u",
          "http://api.example.com/0004000000163200/screen_u/2/u"
        ],
        "lower": [
          "http://api.example.com/0004000000163200/screen_u/1/l",
          "http://api.example.com/0004000000163200/screen_u/2/l"
        ]
      }
    },
    "thumbnails": [
      "http://api.example.com/0004000000163200/thumb/1",
      "http://api.example.com/0004000000163200/thumb/2"
    ]
  }
}
```
</details>

<details>
<summary><strong>Screenshots List Response</strong></summary>

```json
{
  "count": 2,
  "screenshots": [
    "http://api.example.com/0004000000163200/screen/1",
    "http://api.example.com/0004000000163200/screen/2"
  ]
}
```
</details>

<details>
<summary><strong>Uncompiled Screenshots Response</strong></summary>

```json
{
  "count": {
    "upper": 2,
    "lower": 2,
    "total": 4
  },
  "screenshots": {
    "upper": [
      {
        "number": 1,
        "url": "http://api.example.com/0004000000163200/screen_u/1/u"
      },
      {
        "number": 2,
        "url": "http://api.example.com/0004000000163200/screen_u/2/u"
      }
    ],
    "lower": [
      {
        "number": 1,
        "url": "http://api.example.com/0004000000163200/screen_u/1/l"
      },
      {
        "number": 2,
        "url": "http://api.example.com/0004000000163200/screen_u/2/l"
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Thumbnails List Response</strong></summary>

```json
{
  "count": 2,
  "thumbnails": [
    "http://api.example.com/0004000000163200/thumb/1",
    "http://api.example.com/0004000000163200/thumb/2"
  ]
}
```
</details>

<details>
<summary><strong>Media List Response</strong></summary>

```json
{
  "banner": "http://api.example.com/0004000000163200/banner",
  "icon": "http://api.example.com/0004000000163200/icon",
  "screenshots": {
    "compiled": [
      "http://api.example.com/0004000000163200/screen/1",
      "http://api.example.com/0004000000163200/screen/2"
    ],
    "uncompiled": {
      "upper": [
        "http://api.example.com/0004000000163200/screen_u/1/u",
        "http://api.example.com/0004000000163200/screen_u/2/u"
      ],
      "lower": [
        "http://api.example.com/0004000000163200/screen_u/1/l",
        "http://api.example.com/0004000000163200/screen_u/2/l"
      ]
    },
    "thumbnails": [
      "http://api.example.com/0004000000163200/thumb/1",
      "http://api.example.com/0004000000163200/thumb/2"
    ]
  }
}
```
</details>

<details>
<summary><strong>Stats Response</strong></summary>

```json
{
  "total": 1500,
  "categories": {
    "base": 800,
    "dlc": 200,
    "dsiware": 150,
    "extras": 100,
    "themes": 100,
    "updates": 50,
    "videos": 50,
    "virtual-console": 50
  }
}
```
</details>

<details>
<summary><strong>Category List Response</strong></summary>

```json
{
  "category": "base",
  "count": 800,
  "titles": [
    "0004000000163200",
    "0004000000163201",
    "0004000000163202"
  ]
}
```
</details>

<details>
<summary><strong>Error Response</strong></summary>

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "status": 404,
    "message": "The requested resource was not found"
  },
  "details": {
    "tid": "0004000000163200",
    "requestedPath": "/0004000000163200/mediaaa",
    "suggestedPath": "Did you mean: /0004000000163200/media?",
    "possibleIssues": [
      "The TID might not exist in the database",
      "The requested resource might not be available for this title",
      "The file might have been moved or deleted",
      "The category might be invalid or empty"
    ]
  }
}
```
</details>

## Setup

1. Clone the repository:
```bash
git clone https://github.com/ghost-land/3DSDBAPI.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

- `PORT`: Server port (default: 3000)

## Deployment

### Ubuntu Deployment with PM2

1. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2 globally:
```bash
sudo npm install -g pm2
```

3. Clone and setup the project:
```bash
git clone https://github.com/ghost-land/3DSDBAPI.git
cd 3DSDBAPI
npm install
npm run build
```

4. Start with PM2:
```bash
npm run prod
```

5. Configure PM2 to start on system boot:
```bash
pm2 startup
pm2 save
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0 - see the [License](./LICENSE) file for details.

## Related Projects

- [3dsdb](https://github.com/ghost-land/3dsdb)
- [3dserver](https://github.com/ghost-land/3dserver)
