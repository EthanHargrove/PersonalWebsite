# External imports
import axelrod as axl

# Internal imports
from BayesianTypeBasedReasoning import BayesianTypeBasedReasoning

potential_policies = {
    "Cooperator": axl.Cooperator,
    "Defector": axl.Defector,
    "Grudger": axl.Grudger,
    "TitForTat": axl.TitForTat,
    "TitFor2Tats": axl.TitFor2Tats,
    "Predator": axl.Predator,
    "Bully": axl.Bully,
    "Random": axl.Random,
    "FirstByAnonymous": axl.FirstByAnonymous,
    "FirstByDavis": axl.FirstByDavis,
    "FirstByDowning": axl.FirstByDowning,
    "FirstByFeld": axl.FirstByFeld,
    "FirstByGraaskamp": axl.FirstByGraaskamp,
    "FirstByGrofman": axl.FirstByGrofman,
    "FirstByJoss": axl.FirstByJoss,
    "FirstByNydegger": axl.FirstByNydegger,
    "FirstByShubik": axl.FirstByShubik,
    "FirstBySteinAndRapoport": axl.FirstBySteinAndRapoport,
    "FirstByTidemanAndChieruzzi": axl.FirstByTidemanAndChieruzzi,
    "FirstByTullock": axl.FirstByTullock,
}


def initialize_agent(chosen_policies, opponent):
    if chosen_policies == ["first_tournament"]:
        policies = [s for s in axl.axelrod_first_strategies]
        agent = BayesianTypeBasedReasoning(policies, num_iter=100, depth=4)
    elif chosen_policies == ["subset"]:
        policies = [
            axl.Grudger,
            axl.TitFor2Tats,
            axl.TitForTat,
            axl.Bully,
            axl.FirstByJoss,
            axl.Predator,
        ]
        agent = BayesianTypeBasedReasoning(policies, num_iter=100, depth=6)
    else:
        believed_policies = []
        for policy in chosen_policies:
            believed_policies.append(potential_policies[policy])
        agent = BayesianTypeBasedReasoning(policies, num_iter=100, depth=5)

    opp = potential_policies[opponent]()
    if opp.classifier["stochastic"]:
        opp._random = axl.RandomGenerator()

    return agent, opp
