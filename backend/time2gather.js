const crypto = require('crypto');
const express = require('express');
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017';
const dbName = process.env.MONGO_DB || 'time2gather';
const port = parseInt(process.env.PORT, 10) || 8000;

const client = new MongoClient(mongoURI);
const app = express();
app.use(express.json());

let events;

const validTimes = [];
for (let i = 0; i <= 24; i++) {
    validTimes.push(i);
}

app.get('/', (req, res) => {
    res.json({
        success: true
    });
});

app.get('/:id', async (req, res) => {
    let eventId = req.params.id;

    let event = await events.findOne({ eventId });
    if (event === null) {
        res.json({
            success: false,
            errorCode: 'NOT_FOUND',
            msg: 'Event not found.'
        });
    }
    else {
        res.json({
            success: true,
            event: event
        });
    }
});

app.post('/:id', async (req, res) => {
    let eventId = req.params.id;

    let event = await events.findOne({ eventId });
    if (event === null) {
        res.json({
            success: false,
            errorCode: 'NOT_FOUND'
        });
        return;
    }

    let q = req.body;
    try {
        for (let i of ['name', 'available'])
            if (q[i] == null)
                throw 'ARGUMENT_ERROR';
        if (q.name.length == 0 || q.name.length > 100)
            throw 'INVALID_NAME';
        if (!Array.isArray(q.available))
            throw 'ARGUMENT_ERROR';
    }
    catch (err) {
        res.json({ success: false, errorCode: err });
        return;
    }

    let dataInd = event.data.findIndex(v => v.name == q.name);
    if (dataInd !== -1) {
        if (event.allowEdits) {
            event.data[dataInd].available = q.available;
            await events.updateOne(
                { eventId },
                {
                    $set: {
                        data: event.data
                    }
                }
            );
        }
        else {
            res.json({ success: false, errorCode: 'DUPLICATE_NAME' });
            return;
        }
    }
    else {
        let d = {
            name: q.name,
            available: q.available
        };
        await events.updateOne(
            { eventId },
            {
                $set: {
                    data: [...event.data, d]
                }
            }
        );
    }

    event = await events.findOne({ eventId });
    res.json({
        success: true,
        event: event
    });
});

app.post('/', async (req, res) => {
    let q = req.body;
    try {
        for (let i of ['title', 'dates', 'times', 'allowEdits'])
            if (q[i] == null)
                throw 'ARGUMENT_ERROR';
        if (q.title.length == 0 || q.title.length > 200)
            throw 'INVALID_TITLE';
        if (!Array.isArray(q.dates) || !Array.isArray(q.times) || q.times.length !== 2 || q.times.some(v => !validTimes.includes(v)) || q.times[0] >= q.times[1])
            throw 'ARGUMENT_ERROR';
        if (q.dates.length == 0)
            throw 'INVALID_DATES';
    }
    catch (err) {
        res.json({ success: false, errorCode: err });
        return;
    }

    crypto.randomBytes(10, async (err, buffer) => {
        if (err) throw err;

        let eventId = buffer.toString('hex');

        let duplicateEvent = await events.findOne({ eventId });
        if (duplicateEvent !== null) {
            res.json({
                success: false,
                errorCode: 'DUPLICATE_ID'
            });
            return;
        }

        await events.insertOne({
            eventId: eventId,
            title: q.title,
            dates: q.dates,
            times: q.times,
            data: [],
            allowEdits: q.allowEdits == true
        });
        res.json({
            success: true,
            eventId: eventId
        });
    });
});

(async () => {
    await client.connect();
    const db = client.db(dbName);
    events = db.collection('events');

    app.listen(port, () => {
        console.log(`time2gather backend listening on port ${port}`);
    });
})();

const shutdown = async () => {
    await client.close();
    process.exit(0);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
