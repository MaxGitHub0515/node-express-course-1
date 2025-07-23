

import cuid from 'cuid';
import Project from '../models/project.model.js';
import path from 'path';
import cwd from 'cwd';

const handleCUID = async (req, res, next) => {
    try {
        // req.method ;
        // req.originalUrl;
        console.log("Cwd Directory:", cwd());
        const project = await Project.findOne({ cuid: cuidId });
        const cuidId = req.params.cuidId;
        const subpath = req.params[0] || 'index.html';

        if (!project) {
            return res.status(404).send('Project not found for this ID.');
        }

        const internalDistPath = project.internalDistPath;
        const filePath = path.join(process.cwd(), internalDistPath, subpath);
        console.log(filePath)
        const baseDistPath = path.join(process.cwd(), internalDistPath);

        // if (!filePath.startsWith(baseDistPath)) {
        //     console.warn(`Path traversal attempt detected: ${req.url} trying to access ${filePath}`);
        //     return res.status(400).send('Invalid path requested.');
        // }

        // if (filePath.endsWith('.html') || (subpath === 'index.html' && filePath.endsWith('/index.html'))) {
        //     let htmlContent = await fs.readFile(filePath, 'utf8');
        //     const baseUrl = `/main-dashboard/projects/mern/${cuidId}/`;
        //     htmlContent = htmlContent.replace(/__BASE_URL__/g, baseUrl);

        //     res.setHeader('Content-Type', 'text/html');
        //     res.send(htmlContent);
        // } else {
        //     res.sendFile(filePath, (err) => {
        //         if (err) {
        //             if (err.code === 'ENOENT' && !filePath.includes('.')) {
        //                 res.sendFile(path.join(baseDistPath, 'index.html'));
        //             } else {
        //                 console.error(`Error serving file ${filePath}:`, err);
        //                 res.status(err.status || 500).send('Failed to load resource.');
        //             }
        //         }
        //     });
        // }

    } catch (error) {
        console.error('Error in dynamic frontend serving:', error);
        res.status(500).send('Internal Server Error while serving project.');
    }
};

handleCUID();

export default handleCUID;