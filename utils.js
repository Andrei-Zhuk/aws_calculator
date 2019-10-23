function checkValidInput({ type, A, B }) {
    if (
        (!type || typeof type !== 'string') ||
        (!A || !Array.isArray(A)) ||
        (!B || !Array.isArray(B))
    ) {
        return false;
    }

    if (Array.isArray(A)) {
        const rowsLength = A[0] && A[0].length;
        for (let i = 0; i < A.length; i++) {
            if (!Array.isArray(A[i]) || A[i].length !== rowsLength) {
                return false;
            } else {
                for (let j = 0; j < A[i].length; j++) {
                    if (typeof A[i][j] !== 'number') {
                        return false;
                    }
                }
            }
        }
    }

    if (Array.isArray(B)) {
        const rowsLength = B[0] && B[0].length;
        for (let i = 0; i < B.length; i++) {
            if (!Array.isArray(B[i]) || B[i].length !== rowsLength) {
                return false;
            } else {
                for (let j = 0; j < B[i].length; j++) {
                    if (typeof B[i][j] !== 'number') {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function getMatrixShape(A) {
    const rows = A.length;
    const columns = A[0].length;

    return {
        rows,
        columns,
    }
}

module.exports = {
    checkValidInput,
    getMatrixShape,
};