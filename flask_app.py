# External Imports
from flask import Flask, jsonify, render_template, request
import axelrod as axl
import numpy as np

# Internal imports
from sudoku_api import (
    generate_sudoku,
    update_notes,
    naked_singles,
    hidden_singles,
    pointing_groups,
    naked_pairs,
    hidden_pairs,
)
from prisoners_dilemma_api import initialize_agent
from BayesianTypeBasedReasoning import BayesianTypeBasedReasoning

app = Flask(
    __name__,
    static_folder="frontend/build",
    template_folder="frontend/build",
    static_url_path="/",
)


@app.route("/")
def index():
    return render_template("index.html")


# Sudoku API
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
    return jsonify(
        {
            "notes": new_notes.tolist(),
            "changes": changes.tolist(),
            "numChanges": int(num_changes),
        }
    )


@app.route("/api/sudoku/naked_singles", methods=["POST"])
def api_naked_singles():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    new_puzzle, changes, num_changes = naked_singles(puzzle, notes)
    return jsonify(
        {
            "puzzle": new_puzzle.tolist(),
            "changes": changes.tolist(),
            "numChanges": int(num_changes),
        }
    )


@app.route("/api/sudoku/hidden_singles", methods=["POST"])
def api_hidden_singles():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    new_puzzle, changes, num_changes = hidden_singles(puzzle, notes)
    return jsonify(
        {
            "puzzle": new_puzzle.tolist(),
            "changes": changes.tolist(),
            "numChanges": int(num_changes),
        }
    )


@app.route("/api/sudoku/pointing_groups", methods=["POST"])
def api_pointing_groups():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    new_notes, changes, num_changes = pointing_groups(puzzle, notes)
    return jsonify(
        {
            "notes": new_notes.tolist(),
            "changes": changes.tolist(),
            "numChanges": int(num_changes),
        }
    )


@app.route("/api/sudoku/naked_pairs", methods=["POST"])
def api_naked_pairs():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    new_notes, changes, num_changes = naked_pairs(puzzle, notes)
    return jsonify(
        {
            "notes": new_notes.tolist(),
            "changes": changes.tolist(),
            "numChanges": int(num_changes),
        }
    )


@app.route("/api/sudoku/hidden_pairs", methods=["POST"])
def api_hidden_pairs():
    data = request.get_json()
    puzzle = data["puzzle"]
    notes = data["notes"]
    new_notes, changes, num_changes = hidden_pairs(puzzle, notes)
    return jsonify(
        {
            "notes": new_notes.tolist(),
            "changes": changes.tolist(),
            "numChanges": int(num_changes),
        }
    )


# Prisoner's Dilemma API
agent = BayesianTypeBasedReasoning([axl.TitForTat])
opp = axl.Cooperator()


@app.route("/api/prisoners_dilemma/initialize", methods=["POST"])
def api_prisoners_dilemma_initialize():
    global agent
    global opp

    data = request.get_json()
    agent, opp, policy_names = initialize_agent(data["policies"], data["opponent"])

    return jsonify({"prior": agent.prior.tolist(), "policy_names": policy_names})


@app.route("/api/prisoners_dilemma/play", methods=["POST"])
def api_prisoners_dilemma_play():
    data = request.get_json()
    if "move" in data.keys():
        if data["move"] == "C":
            opp_move = axl.Action.C
        else:
            opp_move = axl.Action.D
    else:
        opp_move = opp.strategy(agent)

    agent_move = agent.strategy(opp)

    agent.update_history(agent_move, opp_move)
    opp.update_history(opp_move, agent_move)

    new_prior = agent._update_prior(agent.prior, opp.history)

    reward_matrix = np.array([[3, 5], [0, 1]])
    agent_defect = int(agent_move == axl.Action.D)
    opp_defect = int(opp_move == axl.Action.D)

    return jsonify(
        {
            "agent_move": str(agent_move),
            "opp_move": str(opp_move),
            "prior": new_prior.tolist(),
            "agent_reward": int(reward_matrix[opp_defect, agent_defect]),
            "opp_reward": int(reward_matrix[agent_defect, opp_defect]),
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
