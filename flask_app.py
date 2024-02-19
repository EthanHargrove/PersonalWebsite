from flask import Flask, jsonify, render_template, request
from api import generate_sudoku, update_notes

app = Flask(
    __name__,
    static_folder="frontend/build",
    template_folder="frontend/build",
    static_url_path="/",
)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/sudoku/generate", methods=["GET"])
def api_generate_sudoku():
    puzzle = generate_sudoku().tolist()
    return jsonify({"puzzle": puzzle})

@app.route("/api/sudoku/update_notes", methods=["POST"])
def api_update_notes():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    notes = update_notes(puzzle, notes).tolist()
    return jsonify({"notes": notes})

if __name__ == "__main__":
    app.run(debug=True)
