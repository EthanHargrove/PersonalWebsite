# Imports
import axelrod as axl
from axelrod.player import Player
from axelrod.action import Action
import numpy as np


class BayesianTypeBasedReasoning(Player):
    name = "Bayesian Type Based Reasoning"

    # TODO: Needs editing
    classifier = {
        "memory_depth": 1,
        "stochastic": False,
        "long_run_time": False,
        "inspects_source": False,
        "manipulates_source": False,
        "manipulates_state": False,
    }

    def __init__(self, types, noise=0.05, num_iter=10_000, depth=10) -> None:
        super().__init__()

        self.types = types
        self.num_types = len(types)
        self.noise = noise
        self.num_iter = num_iter
        self.depth = depth

        self.prior = np.ones(len(types)) / len(types)
        self.prior /= self.prior.sum()

        self.C, self.D = Action.C, Action.D

        self.reward_matrix = np.array([[3, 5], [0, 1]])

    def strategy(self, opponent):
        """
        Returns the action with the highest value of information.
        """
        if self._history and len(opponent.history) > 0:
            self.prior = self._update_prior(self.prior, opponent.history)
            return (self.C, self.D)[
                np.argmax(
                    self._value_of_info(self.prior, self._history, opponent.history, self.depth)
                )
            ]

        return (self.C, self.D)[np.argmax(self._value_of_info(self.prior, [], [], self.depth))]

    def _update_prior(self, prior, opponent_history):
        """
        Update our prior beilef of opponent's type based off their previous action.
        """
        likelihood = np.zeros(self.num_types)

        # Rollback history to one move before
        self._old_history = self._history
        if len(list(self._history)) == 1:
            self.history = axl.history.History(plays=[], coplays=[])
        else:
            self.history = axl.history.History(
                plays=list(self._history)[:-1], coplays=list(opponent_history)[:-1]
            )

        # Loop through types and calculate the likelihood that they took the previous action
        for i, poss_type in enumerate(self.types):
            # Initialize the possible type and set its history
            poss_type = poss_type()
            if len(list(opponent_history)) > 1:
                for play, coplay in zip(
                    list(opponent_history)[:-1], list(self._history)
                ):
                    poss_type.update_history(play, coplay)

            # Some policies have historical attributes that need to be updated
            if poss_type.name == "First by Downing":
                for round_number in range(len(poss_type.history) + 1):
                    if round_number < 2:
                        continue
                    if round_number == 2:
                        if self.history[0] == self.C:
                            poss_type.number_opponent_cooperations_in_response_to_C += 1
                    elif (poss_type.history[round_number - 3] == self.C) and (
                        self.history[round_number - 2] == self.C
                    ):
                        poss_type.number_opponent_cooperations_in_response_to_C += 1
                    elif (poss_type.history[round_number - 3] == self.D) and (
                        self.history[round_number - 2] == self.C
                    ):
                        poss_type.number_opponent_cooperations_in_response_to_D += 1

            # Monte Carlo sample to get likelihoods for stochastic policies
            if poss_type.classifier["stochastic"]:
                poss_type._random = axl.RandomGenerator()
                num_C = 0
                num_D = 0
                for _ in range(self.num_iter):
                    action = poss_type.strategy(self)
                    if action == self.C:
                        num_C += 1
                    else:
                        num_D += 1
                if opponent_history[-1] == self.C:
                    true_C_rate = num_C / self.num_iter
                    likelihood[i] = true_C_rate * (1 - 2 * self.noise) + self.noise
                else:
                    true_D_rate = num_D / self.num_iter
                    likelihood[i] = true_D_rate * (1 - 2 * self.noise) + self.noise
            # Get the likelihood for deterministic policies
            else:
                action = poss_type.strategy(self)
                if action == opponent_history[-1]:
                    likelihood[i] = 1 - self.noise
                else:
                    likelihood[i] = self.noise

        # Update the prior
        # self.prior *= likelihood
        # self.prior /= np.sum(self.prior)

        # Restore previous history
        self.history = self._old_history

        posterior = likelihood * prior
        posterior /= np.sum(posterior)

        return posterior

    def _value_of_info(self, prior, bayes_history, opponent_history, depth):
        if depth != self.depth:
            prior = self._update_prior(prior, opponent_history)
        action_probs = self._action_probabilities(bayes_history, opponent_history)
        action_values = self._action_values(prior, bayes_history, opponent_history, depth - 1)
        value_of_info = prior @ action_probs @ action_values

        return value_of_info

    def _action_probabilities(self, bayes_history, opponent_history):
        action_probs = np.zeros((self.num_types, 2))

        # Set my history
        self._old_history = self._history
        self.history = axl.history.History(
            plays=bayes_history[:-1], coplays=opponent_history[:-1]
        )

        for i, poss_type in enumerate(self.types):
            # Initialise the policy and set its history
            poss_type = poss_type()

            for play, coplay in zip(opponent_history[:-1], bayes_history):
                poss_type.update_history(play, coplay)

            # Some policies have historical attributes that need to be updated
            if poss_type.name == "First by Downing":
                for round_number in range(len(poss_type.history) + 1):
                    if round_number < 2:
                        continue
                    if round_number == 2:
                        if self.history[0] == self.C:
                            poss_type.number_opponent_cooperations_in_response_to_C += 1
                    elif (poss_type.history[round_number - 3] == self.C) and (
                        self.history[round_number - 2] == self.C
                    ):
                        poss_type.number_opponent_cooperations_in_response_to_C += 1
                    elif (poss_type.history[round_number - 3] == self.D) and (
                        self.history[round_number - 2] == self.C
                    ):
                        poss_type.number_opponent_cooperations_in_response_to_D += 1

            # Get the opponent's policy
            if poss_type.classifier["stochastic"]:
                poss_type._random = axl.RandomGenerator()
                num_C = 0
                num_D = 0
                for _ in range(self.num_iter):
                    action = poss_type.strategy(self)
                    if action == self.C:
                        num_C += 1
                    else:
                        num_D += 1
                true_C_rate = num_C / self.num_iter
                obs_C_rate = true_C_rate * (1 - 2 * self.noise) + self.noise
                obs_D_rate = 1 - obs_C_rate
                action_probs[i, :] = (obs_C_rate, obs_D_rate)
            else:
                action = poss_type.strategy(self)
                action_probs[i, :] = (
                    (self.noise, 1 - self.noise),
                    (1 - self.noise, self.noise),
                )[int(action == self.C)]

        # reset history
        self.history = self._old_history

        return action_probs

    def _action_values(self, prior, bayes_history, opponent_history, depth):
        if depth == 0:
            return self.reward_matrix

        VOI_C_C = np.max(
            self._value_of_info(
                prior, list(bayes_history) + [self.C], list(opponent_history) + [self.C], depth
            )
        )
        VOI_C_D = np.max(
            self._value_of_info(
                prior, list(bayes_history) + [self.C], list(opponent_history) + [self.D], depth
            )
        )
        VOI_D_C = np.max(
            self._value_of_info(
                prior, list(bayes_history) + [self.D], list(opponent_history) + [self.C], depth
            )
        )
        VOI_D_D = np.max(
            self._value_of_info(
                prior, list(bayes_history) + [self.D], list(opponent_history) + [self.D], depth
            )
        )

        VOIs = np.array([[VOI_C_C, VOI_D_C], [VOI_C_D, VOI_D_D]])

        return self.reward_matrix + VOIs

    @property
    def history(self):
        return self._history

    @history.setter
    def history(self, value):
        self._history = value
