import mongoose from "mongoose";

const criteriaScoreSchema = new mongoose.Schema({
  criteriaName: {
    type: String,
    required: true
  },

  score: {
    type: Number,
    required: true
  }

}, { _id: false });

const scoreSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  round: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Round",
    required: true
  },

  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // 🔥 Store scores per criteria
  criteriaScores: [criteriaScoreSchema],

  totalScore: {
    type: Number,
    default: 0
  },

  feedback: String

}, { timestamps: true });


// 🔥 Prevent duplicate scoring by same judge
scoreSchema.index(
  { team: 1, round: 1, judge: 1 },
  { unique: true }
);


// 🔥 Validate + Calculate total score
scoreSchema.pre("save", async function (next) {
  try {
    const Round = mongoose.model("Round");

    const round = await Round.findById(this.round);

    if (!round) {
      return next(new Error("Round not found"));
    }

    let total = 0;

    for (const cs of this.criteriaScores) {
      const criteria = round.evaluationCriteria.find(
        c => c.name === cs.criteriaName
      );

      if (!criteria) {
        return next(new Error(`Invalid criteria: ${cs.criteriaName}`));
      }

      // Validate max score
      if (cs.score > criteria.totalScore) {
        return next(
          new Error(
            `${cs.criteriaName} exceeds max score (${criteria.totalScore})`
          )
        );
      }

      // Validate min score (optional rule)
      if (cs.score < criteria.minScore) {
        return next(
          new Error(
            `${cs.criteriaName} is below min score (${criteria.minScore})`
          )
        );
      }

      total += cs.score;
    }

    this.totalScore = total;

    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Score", scoreSchema);