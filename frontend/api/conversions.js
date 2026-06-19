import CloudConvert from 'cloudconvert';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({ keepExtensions: true });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    if (!data.files.file || data.files.file.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = data.files.file[0];
    const targetFormat = data.fields.target_format ? data.fields.target_format[0] : null;

    if (!targetFormat) {
       return res.status(400).json({ error: 'Target format is required' });
    }

    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-my-file': {
          operation: 'import/upload'
        },
        'convert-my-file': {
          operation: 'convert',
          input: 'import-my-file',
          output_format: targetFormat
        },
        'export-my-file': {
          operation: 'export/url',
          input: 'convert-my-file'
        }
      }
    });

    const uploadTask = job.tasks.filter(task => task.name === 'import-my-file')[0];
    
    const fileStream = fs.createReadStream(file.filepath);
    await cloudConvert.tasks.upload(uploadTask, fileStream, file.originalFilename);

    const finishedJob = await cloudConvert.jobs.wait(job.id);
    const exportTask = finishedJob.tasks.filter(task => task.name === 'export-my-file')[0];
    
    if (!exportTask.result || !exportTask.result.files) {
        throw new Error("Conversion failed on CloudConvert servers.");
    }
    
    const exportFile = exportTask.result.files[0];

    res.status(200).json({ download_url: exportFile.url });
  } catch (error) {
    console.error('Conversion Error:', error);
    res.status(500).json({ error: error.message || 'Conversion failed' });
  }
}
