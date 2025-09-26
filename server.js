import express from 'express';
import cors from 'cors';
import simpleGit from 'simple-git';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.post('/review', async (req, res) => {
    const { repoUrl, sourceBranch, targetBranch } = req.body;

    if (!repoUrl || !sourceBranch || !targetBranch) {
        return res.status(400).send('Missing required fields: repoUrl, sourceBranch, or targetBranch');
    }

    try {
        const localPath = `./repos/${new URL(repoUrl).pathname.split('/').pop()}`;
        const git = simpleGit();

        // Clone or open the repository
        await git.clone(repoUrl, localPath, ['--bare']).catch(err => {
            if (!err.message.includes('already exists')) {
                throw err;
            }
        });

        const repo = simpleGit(localPath);

        // Fetch updates
        await repo.fetch();

        // Get the diff
        const diff = await repo.diff([`${sourceBranch}`, `${targetBranch}`]);

        res.send({ diff });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the request.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});