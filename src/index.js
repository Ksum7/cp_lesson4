document.addEventListener('DOMContentLoaded', setup);

function setup() {
    document.getElementById('differentiate').onclick = differentiate;
}

function differentiate() {
    const expression = document.getElementById('expression').value;
    const variable = document.getElementById('variable').value;

    // Assuming MiniMaple.d is the differentiation function
    try {
        const result = MiniMaple.d(expression, variable);
        document.getElementById('result').innerHTML = `Result: ${result}`;
    } catch (error) {
        document.getElementById('result').innerHTML = `Error: ${error.message}`;
    }
}