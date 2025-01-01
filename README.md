# 3DSDB API

A RESTful API for accessing 3DS game metadata, screenshots, and media assets.

## Features

- Access game metadata in XML format
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
| `GET /:tid` | Get title metadata (XML) |
| `GET /:tid/banner` | Get title banner image |
| `GET /:tid/icon` | Get title icon image |
| `GET /:tid/screen/:num` | Get compiled screenshot |
| `GET /:tid/screen_u/:num/:screen` | Get uncompiled screenshot (u/l) |
| `GET /:tid/screens` | List all available screenshots |
| `GET /:tid/thumb/:num` | Get specific thumbnail |
| `GET /:tid/thumbs` | List all available thumbnails |

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