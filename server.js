const fs = require('fs');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('build'));

const port = 2000;

const superSecureAccessToken = 'abc123';

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, superSecureAccessToken, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};

function csvToObjArray(data) {
	const lines = data.trim().split(/\r?\n/);

	// pull out keys, split, and trim whitespace
	const keys = lines.shift()
		.split(',')
		.map((key) => key.trim());

	const ObjectArray = lines.map((line) => {
		//split and trim current line
		const entries = line.split(',')
			.map((lineItem) => lineItem.trim())
			// create array of object entries indexed by the correct key
			.map((trimmedItem, index) =>
				[keys[index], trimmedItem]
			);
		return Object.fromEntries(entries);
	})

	return ObjectArray;
}

app.post('/login', (req, res) => {
	if(req.body.userName === 'user' && req.body.password === 'password') {
		const accessToken = jwt.sign({ user: 'user' }, superSecureAccessToken);
		res.json({
			accessToken,
		});
	} else {
		res.json({
			error: 'incorrect user name or password',
		});
	}
});

app.get('/data/manifest', authenticateJWT, (req, res) => {
	fs.readFile(path.join(__dirname, 'mesh_manifest.csv'), 'utf8', function(error, data) {
		if (error) {
			res.json({
				error
			})
		}
		//split by new line windows or unix
		res.json(csvToObjArray(data));
	});
});

app.get('/data/model/:slug', authenticateJWT, (req, res) => {
	if (fs.existsSync(path.join('mesh', `${req.params.slug}.stl`))) {
		res.sendFile(`${req.params.slug}.stl`, { root: path.join(__dirname ,'mesh') });
	} else {
		res.json({
			error: 'mesh file not found',
		})
	}
})

app.get('*', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, 'build') });
});

app.listen(port, () => {
	console.log(`contilio_viewer listening at http://localhost:${port}`)
});
