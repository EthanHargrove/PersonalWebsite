# External Imports
from flask import Flask, jsonify, render_template, request
# Internal imports
from api import generate_sudoku, update_notes, naked_singles

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
    new_notes, changes, num_changes = update_notes(puzzle, notes)
    return jsonify({"notes": new_notes.tolist(), "changes": changes.tolist(), "numChanges": int(num_changes)})

@app.route("/api/sudoku/naked_singles", methods=["POST"])
def api_naked_singles():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    new_puzzle, changes, num_changes = naked_singles(puzzle, notes)
    return jsonify({"puzzle": new_puzzle.tolist(), "changes": changes.tolist(), "numChanges": int(num_changes)})

if __name__ == "__main__":
    app.run(debug=True)
