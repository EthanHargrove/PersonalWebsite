from flask import Flask, render_template, jsonify
import numpy as np
from sudoku import Sudoku

app = Flask(
    __name__,
    static_folder="frontend/build",
    template_folder="frontend/build",
    static_url_path="/",
)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/generate_sudoku")
def generate_sudoku():
    difficulty = np.random.rand()*0.5 + 0.25
    puzzle = Sudoku(3).difficulty(difficulty).board
    puzzle = [[cell if cell is not None else 0 for cell in row] for row in puzzle]
    return jsonify({"puzzle": puzzle})

if __name__ == "__main__":
    app.run(debug=True)
