const request = require('supertest');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = require('../app');

const tmpFile = (content) => {
    const p = path.join(os.tmpdir(), `test-${Date.now()}-${Math.random()}.csv`);
    fs.writeFileSync(p, content, 'utf8');
    return p;
};

describe('POST /csv (API)', () => {
    it('should convert CSV to JSON', async () => {
        const res = await request(app)
            .post('/csv')
            .attach('csvFile', path.join(__dirname, 'fixtures', 'test.csv'));

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(3);
        expect(res.body[0]).toHaveProperty('name', 'Alice');
        expect(res.body[0]).toHaveProperty('age', 30);
        expect(res.body[0]).toHaveProperty('city', 'Madrid');
    });

    it('should reject non-csv files', async () => {
        const res = await request(app)
            .post('/csv')
            .attach('csvFile', path.join(__dirname, 'fixtures', 'test.csv'), {
                filename: 'test.txt',
                contentType: 'text/plain'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 400 when no file is sent', async () => {
        const res = await request(app).post('/csv');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should support custom delimiter via query', async () => {
        const res = await request(app)
            .post('/csv?delimiter=;')
            .attach('csvFile', path.join(__dirname, 'fixtures', 'test_semicolon.csv'));

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toHaveProperty('name', 'Alice');
    });
});

describe('POST /csv/download', () => {
    it('should return a downloadable JSON file', async () => {
        const res = await request(app)
            .post('/csv/download')
            .attach('csvFile', path.join(__dirname, 'fixtures', 'test.csv'));

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-disposition']).toContain('attachment');
        expect(res.headers['content-type']).toContain('application/json');
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should reject non-csv files', async () => {
        const res = await request(app)
            .post('/csv/download')
            .attach('csvFile', path.join(__dirname, 'fixtures', 'test.csv'), {
                filename: 'data.txt',
                contentType: 'text/plain'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('success', false);
    });
});

describe('POST / (web)', () => {
    it('should render home with result', async () => {
        const res = await request(app)
            .post('/')
            .attach('csvFile', path.join(__dirname, 'fixtures', 'test.csv'));

        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Alice');
    });

    it('should render home page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('CSV Service');
    });
});

describe('Service: csvToJson', () => {
    const csvService = require('../services/csv');

    it('should parse CSV file to JSON array', async () => {
        const fp = tmpFile('name,age\nAlice,30\nBob,25');
        const data = await csvService.csvToJson(fp);
        expect(data).toHaveLength(2);
        expect(data[0]).toEqual({ name: 'Alice', age: 30 });
        expect(data[1]).toEqual({ name: 'Bob', age: 25 });
        fs.unlinkSync(fp);
    });

    it('should handle empty lines', async () => {
        const fp = tmpFile('name,age\nAlice,30\n\nBob,25\n');
        const data = await csvService.csvToJson(fp);
        expect(data).toHaveLength(2);
        fs.unlinkSync(fp);
    });

    it('should support custom delimiter', async () => {
        const fp = tmpFile('name;age\nAlice;30\nBob;25');
        const data = await csvService.csvToJson(fp, { delimiter: ';' });
        expect(data).toHaveLength(2);
        expect(data[0]).toEqual({ name: 'Alice', age: 30 });
        fs.unlinkSync(fp);
    });
});
