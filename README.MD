# Social Media Video Downloader

A Node.js application for downloading videos from various social media platforms. This application provides two endpoints for handling video downloads:

1. **POST** `{{baseURL}}/social/media-list` - Retrieves available formats for a given URL.
2. **GET** `{{baseURL}}/social/media-download?url={{url}}&id={{format_id}}` - Downloads the requested video in the specified format.

## Supported Platforms

- YouTube
- Facebook
- Instagram
- TikTok
- Twitter
- Twitch
- Vimeo
- Dailymotion
- Reddit
- SoundCloud
- Tumblr
- LinkedIn
- VK
- BiliBili
- Metacafe

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/akshaymemail/social-downloader.git
   ```

2. Navigate to the project directory:

   ```bash
   cd social-downloader
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following content:

   ```
   YT_DLP_PATH=/opt/homebrew/bin/yt-dlp

   For more info check yt-dlp
   ```

2. Update `YT_DLP_PATH` with the appropriate path of yt-dlp.

## Usage

### Get Available Formats

Send a POST request to `/social/media-list` with the following payload:

```json
{
  "url": "https://www.example.com/video"
}
```
