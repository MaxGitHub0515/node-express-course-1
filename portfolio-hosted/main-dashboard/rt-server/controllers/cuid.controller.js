

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

        if (!filePath.startsWith(baseDistPath)) {
            console.warn(`Path traversal attempt detected: ${req.url} trying to access ${filePath}`);
            return res.status(400).send('Invalid path requested.');
        }

       

    } catch (error) {
        console.error('Error in dynamic frontend serving:', error);
        res.status(500).send('Internal Server Error while serving project.');
    }
};

handleCUID();

export default handleCUID;