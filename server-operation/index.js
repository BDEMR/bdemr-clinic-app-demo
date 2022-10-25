const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').ObjectId;


const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
/* operationNote
B2OzM2TutZ3sl8E4 */


const uri = "mongodb+srv://operationNote:B2OzM2TutZ3sl8E4@cluster0.ztbak3g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const PreOperation = client.db('preOperation').collection('PreData');
        const preOperationNote = client.db('preOperation').collection('suggestion');
        const postOperation = client.db('postOperation').collection('postData');
        const postOperationNote = client.db('postOperation').collection('postNote');


        //post operation
        app.get('/PostoperationData', async (req, res) => {
            const query = {};
            const cursor = postOperation.find(query);
            const data = await cursor.toArray();
            res.send(data);


        })

        app.post('/PostOperationData', async (req, res) => {
            const newdata = req.body;
            console.log('adding new', newdata);
            const preData = await postOperation.insertOne(newdata);
            res.send(preData);

        })

        app.get('/postOperationNote', async (req, res) => {
            const query = {};
            const cursor = postOperationNote.find(query);
            const note = await cursor.toArray();
            res.send(note);
        })

        app.post('/postOperationNote', async (req, res) => {
            const newdata = req.body;
            console.log('adding new', newdata);
            const operationNote = await postOperationNote.insertOne(newdata);
            res.send(operationNote);

        })

        app.delete('/operationpost/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: objectId(id) };
            const result = await postOperationNote.deleteOne(query);
            res.send(result)

        })




        //pre operation prescription
        app.get('/operationData', async (req, res) => {
            const query = {};
            const cursor = PreOperation.find(query);
            const data = await cursor.toArray();
            res.send(data);


        })

        app.post('/operationData', async (req, res) => {
            const newdata = req.body;
            console.log('adding new', newdata);
            const preData = await PreOperation.insertOne(newdata);
            res.send(preData);

        })

        app.get('/operationNote', async (req, res) => {
            const query = {};
            const cursor = preOperationNote.find(query);
            const note = await cursor.toArray();
            res.send(note);
        })

        app.post('/operationNote', async (req, res) => {
            const newdata = req.body;
            console.log('adding new', newdata);
            const operationNote = await preOperationNote.insertOne(newdata);
            res.send(operationNote);

        })

        app.delete('/operation/:id', async (req, res) => {
            const id = req.params.id;
            const query={_id: objectId(id)};
            const result = await preOperationNote.deleteOne(query);
            res.send(result)

        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running My Node CRUD Server');
});

app.listen(port, () => {
    console.log('CRUD Server is running');
})