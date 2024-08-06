import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function mediaList(req, res) {
  //console.log("env", process.env);
  const { url } = req.body;
  const ytDlpPath = process.env.YT_DLP_PATH; // Replace this with the actual path to yt-dlp

  // Run yt-dlp to list available formats
  exec(`${ytDlpPath} -F "${url}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({
        message: "Error listing formats",
      });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);

    // Parse the output to extract formats
    const formats = stdout
      .split("\n")
      .slice(4)
      .filter((line) => line)
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        return {
          format_id: parts[0],
          extension: parts[1],
          resolution: parts[2],
          note: parts.slice(3).join(" "),
        };
      });

    res.status(200).json(formats);
  });
}

function mediaDownload(req, res) {
  const { url, id } = req.query;

  const outputPath = path.join(__dirname, "output.mp4");
  const ytDlpPath = process.env.YT_DLP_PATH; // Replace this with the actual path to yt-dlp

  // Run yt-dlp to download the video
  exec(
    `${ytDlpPath} -f ${id} -o "${outputPath}" "${url}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({
          message: "Error downloading media",
        });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(`Stdout: ${stdout}`);

      // Read the downloaded video file and send it as a response
      res.setHeader("Content-Disposition", 'attachment; filename="media.mp4"');
      res.setHeader("Content-Type", "video/mp4");

      const readStream = fs.createReadStream(outputPath);
      readStream.pipe(res);

      readStream.on("close", () => {
        // Delete the file after sending it
        fs.unlink(outputPath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
          }
        });
      });
    }
  );
}
const socialController = {
  mediaList,
  mediaDownload,
};

export default socialController;
