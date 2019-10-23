const express = require('express');
const bodyParser = require('body-parser');

const utils = require('./utils')

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/calc', (req, res, next) => {
    if (!utils.checkValidInput(req.body)) {
        next(new Error('invalid input params'));
    }
    if (req.body.type === 'summ') {
        const result = handleMatrixSumm(req.body.A, req.body.B);
        res.json({ result });
    } else if (req.body.type === 'multiply') {
        const result = handleMatrixMultiply(req.body.A, req.body.B);
        res.json({ result });
    } else {
        next(new Error('no such action available'));
    }
})

function handleMatrixSumm(A, B) {
    const Ashape =  utils.getMatrixShape(A);
    const Bshape =  utils.getMatrixShape(B);
    if (Ashape.rows !== Bshape.rows || Ashape.columns !== Bshape.columns) {
        throw new Error('Matrixes have not the same shape');
    }

    const result = [];

    for (let i = 0; i < A.length; i++) {
        result.push([]);
        for (let j = 0; j < A[i].length; j++) {
            result[i].push(A[i][j] + B[i][j])
        }
    }
    return result;
}

function handleMatrixMultiply(A, B) {
    const Ashape =  utils.getMatrixShape(A);
    const Bshape =  utils.getMatrixShape(B);
    if (Ashape.columns !== Bshape.rows) {
        throw new Error('Matrixes shapes do not match');
    }

    const result = [];

    for (let i = 0; i < Ashape.rows; i++) {
        result.push([]);
        for (let j = 0; j < Bshape.columns; j++) {
            let summ = 0;
            for (let k = 0; k < Ashape.columns; k++) {
                summ += A[i][k] * B[k][j]
            }
            result[i][j] = summ;
        }
    }
    return result;
}


app.use(function(err, req, res, next) {
    res.status(500).send({ error: err.message });
})

app.listen(port, () => console.log(`App listening on port ${port}!`))